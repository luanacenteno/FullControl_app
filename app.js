const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'full_control_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/usuarios', (req, res) => { 
    connection.query('SELECT * FROM usuarios', function (error, results, fields) {
    if (error) {
        throw error;
    }

    res.json(results);

    });
})

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
      message: "User created successful!"
    });

  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})