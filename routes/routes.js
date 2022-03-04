module.exports = function(app){

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '7818109',
    database : 'full_control_db'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    //AUDITAR
    app.get('/auditorias', (req, res) => { 
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
    app.post('/auditorias', (req, res) => { 
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



    //Continuar auditoria
    app.get('/auditorias/:id', (req, res) => { 
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
    app.get('/usuarios', (req, res) => { 
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

    app.get('/usuarios/auditoria', (req, res) => { 
        let where = "";
        if (req.query.rol) {
            where = req.query.rol ? " WHERE rol = '" + req.query.rol + "'" : "";
        }
        const join = "left join auditorias a on u.id=a.cliente_id and estado = 'abierta'";
        const orderBy = " order by nombre";
        connection.query('SELECT a.id as auditoria_id, a.fecha, u.id, u.nombre FROM usuarios u ' + join + where + orderBy, function (error, results, fields) {
        if (error) {
            throw error;
        }

        res.json(results);

        });
    })


    //Crear usuarios
    app.post('/usuarios', (req, res) => { 
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
    app.get('/requisitos', (req, res) => {
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
    app.get('/categorias', (req, res) => { 
    connection.query('SELECT * FROM categorias', function (error, results, fields) {
    if (error) {
        throw error;
    }
    res.json(results);

    });
    })


    //Guardar auditoria
    app.post('/puntos_requisitos_auditoria', (req, res) => { 
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