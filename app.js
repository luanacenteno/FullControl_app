const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const auditorias = require('./routes/routes')(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})