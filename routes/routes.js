module.exports = function(app){

    var mysql      = require('mysql');
    var connection = mysql.createPool({
        // socketPath: '/cloudsql/fullcontrol-344313:us-west1:full-control-db',
        host: '34.105.46.83',
        user: 'root',
        password: '7818109',
        database: 'full_control_db'
    });
    
    connection.connect(function(err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
    });

    app.get('/ping', (req, res) => { 
        
        res.json({"message": "pong"});
    });

    //AUDITAR
    app.get('/api/auditorias', (req, res) => { 
        let where = "";
        if (req.query.estado) {
            where = req.query.estado ? " WHERE estado = '" + req.query.estado + "'" : "";
        }
        const query = "SELECT a.id, a.fecha, u.id as cliente_id, u.nombre FROM auditorias a inner join usuarios u on u.id=a.cliente_id " + where;
        console.log('query*****', query);
        connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.status(201);
        res.json(results);
    
        });

    })

    //Iniciar auditoria
    app.post('/api/auditorias', (req, res) => { 
        const query = 'INSERT INTO auditorias (usuario_id, cliente_id, servicio_id, fecha, maximo_aplicable, estado) values (' + 
                        req.body.usuario_id + ',' + 
                        req.body.cliente_id + ',' + 
                        req.body.servicio_id + ',' + 
                        'NOW(),' +
                        '1,' +
                        '"abierta"' + ')';
        console.log('POST /auditorias query: ', query);
    
        connection.query(query, function (error, result, fields) {
        if (error) {
            throw error;
        }
        
        res.status(201);
        res.json({
            id: result.insertId,
            message: "Auditoria creada con éxito!"
        });
        });
    })

    //Cerrar auditoria
    app.put('/api/auditorias/:id', (req, res) => {
        const id = req.params.id;
        if (id && isNaN(id)) {
            res.status(400)
            return res.json({
            message: "Auditoría inválida, se espera un número"
            });
        }
        const where = id ? " WHERE id = " + id : "";
        connection.query("UPDATE auditorias SET estado = 'cerrada'"  + where, function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results[0]);
    
        });
       
    })


    //Continuar auditoria
    app.get('/api/auditorias/:id', (req, res) => { 
        const id = req.params.id;
        if (id && isNaN(id)) {
            res.status(400)
            return res.json({
            message: "Auditoría inválida, se espera un número"
            });
        }
        const where = id ? " WHERE id = " + id : "";
        connection.query('SELECT * FROM auditorias ' + where, function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results[0]);
    
        });
    })

    app.get('/api/auditorias/detalle/:id', (req, res) => { 
        const id = req.params.id;
        if (id && isNaN(id)) {
            res.status(400)
            return res.json({
            message: "Auditoría inválida, se espera un número"
            });
        }
        const query = "SELECT a.id auditoria, a.fecha, t.nombre tecnico, cli.nombre cliente, s.nombre servicio, a.estado, c.nombre categoria," +
                " r.nombre requisito, n.nombre normativa, n.url, n.detalle detalle, pra.puntaje puntaje_requisito, p.descripcion puntaje_nombre" +
                " FROM auditorias a" +
                " left join usuarios t on t.id=a.usuario_id" +
                " left join usuarios cli on cli.id=a.cliente_id" +
                " left join servicios s on s.id=a.servicio_id" +
                " left join puntos_requisitos_auditoria pra on pra.auditoria_id=a.id" +
                " left join requisitos r on r.id=pra.requisito_id " +
                " left join normativas n on n.id=r.normativa_id " +
                " left join categorias c on c.id=r.categoria_id" +
                " left join puntajes p on p.valor=pra.puntaje" +
                " where pra.puntaje != -1 and a.id = " + id +
                " group by auditoria, fecha, tecnico, cliente, servicio, estado, categoria, requisito, puntaje_requisito" +
                " order by categoria;"

        connection.query(query, async function (error, queryResults, fields) {
            if (error) {
                throw error;
            }

            let i = 0;
            let categorias = {};
            let puntaje_total = 0;
            for (const result of queryResults) {
                const requisito_categoria = {
                    nombre: result.requisito,
                    normativa: result.normativa,
                    url: result.url,
                    puntaje: result.puntaje_requisito,
                    puntaje_nombre: result.puntaje_nombre,
                    detalle: result.detalle,
                }
                if (categorias[result.categoria]) {
                    categorias[result.categoria].requisitos.push(requisito_categoria);
                    categorias[result.categoria].puntaje_total += requisito_categoria.puntaje;
                    i++;
                } else {
                    categorias[result.categoria] = {
                        requisitos: [
                            requisito_categoria
                        ],
                        puntaje_total: requisito_categoria.puntaje
                    };
                    i++;
                }
                puntaje_total += requisito_categoria.puntaje;
                if (queryResults.length == i) {
                    let puntaje_maximo = 0;
                    for (const r of queryResults) {
                        console.log('r', r, 'r.categoria', r.categoria);
                        categorias[r.categoria].puntaje_maximo = categorias[r.categoria].requisitos.length * 2;
                        categorias[r.categoria].puntaje_porcentaje = Math.round(categorias[r.categoria].puntaje_total * 100 / categorias[r.categoria].puntaje_maximo);
                        for (const requisito of categorias[r.categoria].requisitos) {
                            if (requisito.puntaje < 0) {
                                console.log('dasd1a6s5d4165as4ds?**********************************--------------------------------');
                            }
                            puntaje_maximo += 2;
                        }
                    }
                    res.json({
                        auditoria_id: queryResults[0].auditoria,
                        fecha: queryResults[0].fecha,
                        tecnico: queryResults[0].tecnico,
                        cliente: queryResults[0].cliente,
                        servicio: queryResults[0].servicio,
                        estado: queryResults[0].estado,
                        puntaje_maximo: i * 2,
                        puntaje_total: puntaje_total,
                        puntaje_porcentaje: Math.round(puntaje_total * 100 / (i * 2)),
                        categorias: categorias
                    });
                }
            };
                    
        });
    })

    async function getRequisitosPorCategoria(results) {
        let categorias = [];
        
        return categorias;
    }
    
/*
    //Continuar auditoria
    app.get('/auditorias', (req, res) => { 
        let where = "";
        if (req.query.estado) {
            where = req.query.estado ? " WHERE estado = '" + req.query.estado + "'" : "";
        }

        connection.query("SELECT a.id, u.nombre, a.fecha FROM auditorias a inner join usuarios u on u.id=a.cliente_id " + where, function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.json(results);
    
        });
    })*/
  
    //Listar usuarios
    app.get('/api/usuarios', (req, res) => { 
        let where = "";
        if (req.query.rol) {
            where = req.query.rol ? " WHERE rol = '" + req.query.rol + "'" : "";
        }
        const orderBy = " order by nombre";
        connection.query('SELECT * FROM usuarios ' + where + orderBy, function (error, results, fields) {
        if (error) {
            throw error;
        }

        res.json(results);

        });
    })

    app.get('/api/usuarios/auditoria', (req, res) => { 
        const query = "SELECT a.id as auditoria_id, a.fecha, u.id, u.nombre, GROUP_CONCAT(distinct c.nombre SEPARATOR ' | ') categorias " +
                      " FROM usuarios u" +
                      " left join auditorias a on u.id=a.cliente_id and estado = 'abierta'" +
                      " left join puntos_requisitos_auditoria pra on pra.auditoria_id=a.id" +
                      " left join requisitos r on r.id=pra.requisito_id " +
                      " left join categorias c on c.id=r.categoria_id" +
                      " where rol='cliente'" +
                      " group by auditoria_id, a.fecha, id, u.nombre" +
                      " order by auditoria_id desc, nombre";
        console.log('query', query);
        connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }

        res.json(results);

        });
    })


    //Crear usuarios
    app.post('/api/usuarios', (req, res) => { 
    const query = 'INSERT INTO usuarios (nombre, email, telefono, pass, rol, direccion, rubro) values ("' + 
                    req.body.nombre + '","' + 
                    req.body.email + '","' + 
                    req.body.telefono + '","' +
                    req.body.pass + '","' + 
                    req.body.rol + '","' + 
                    req.body.direccion + '","' +  
                    req.body.rubro + '")';
    console.log('POST /usuarios query: ', query);

    connection.query(query, function (error, result, fields) {
        if (error) {
            throw error;
        }
        
        res.status(201);
        res.json({
        message: "Usuario creado con éxito!"
        });

    });
    })


    //Requisitos auditoria
    app.get('/api/requisitos', (req, res) => {
    console.log('req.query', req.query.categoria);
    if (req.query.categoria && isNaN(req.query.categoria)) {
        res.status(400)
        return res.json({
        message: "Categoria inválida, se espera un número"
        });
    }
    const where = req.query.categoria ? " WHERE categoria_id = " + req.query.categoria : "";
    connection.query('SELECT * FROM requisitos ' + where, function (error, results, fields) {
    if (error) {
        throw error;
    }
    res.json(results);

    });
    })


    //Categorias auditoria
    app.get('/api/categorias', (req, res) => { 
    connection.query('SELECT * FROM categorias', function (error, results, fields) {
    if (error) {
        throw error;
    }
    res.json(results);

    });
    })


    //Guardar auditoria
    app.post('/api/puntos_requisitos_auditoria', (req, res) => { 
    console.log('puntos_requisitos_auditoria body', req.body);
    var values = "";
    req.body.forEach(requisito => {
        values += "('" + requisito.puntaje + "'," + requisito.auditoria_id + "," + requisito.requisito_id + "),";
    });
    values = values.substr(0, values.length - 1);
    console.log("Values: " + values);
    const query = 'INSERT INTO puntos_requisitos_auditoria (puntaje, auditoria_id, requisito_id) values ' + values;
    console.log('POST / query: ', query);

    connection.query(query, function (error, result, fields) {
        if (error) {
            throw error;
        }
        
        res.status(201);
        res.json({
        message: "Guardado con éxito!!"
        });

    });
    })
}