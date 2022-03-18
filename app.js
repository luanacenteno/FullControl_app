const express = require('express');
const app = express();
const mysql = require("mysql");

app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`fullcontrol-db Rest API listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Full Control Ready to roll!"});
});

const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//app.use(express.static(process.cwd() + "/dist/"));

const auditorias = require('./routes/routes')(app);
