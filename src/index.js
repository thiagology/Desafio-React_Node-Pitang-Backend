const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require("cors");
const Routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/pitang', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(Routes);

app.get('/', (request, response) => {
  response.send({ message: 'Hello Pitang' });
});

app.listen(3333, () => {
  console.log('Rodando na porta 3333');
});
