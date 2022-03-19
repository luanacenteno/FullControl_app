const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`fullcontrol-db Rest API listening on port ${port}`);
});

const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/dist/"));


const auditorias = require('./routes/routes')(app);

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
});
