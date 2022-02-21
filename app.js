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
  password : '7818109',
  database : 'full_control_db'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/users', (req, res) => { 
    connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) {
        throw error;
    }

    res.json(results);
    });
})

app.post('/users', (req, res) => { 
  const query = 'INSERT INTO users (name, last_name) values ("' + req.body.name + '","' + req.body.lastName + '")';
  console.log('POST /users query: ', query);
  connection.query(query, function (error, result, fields) {
  if (error) {
      throw error;
  }
  
  res.json(result);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})