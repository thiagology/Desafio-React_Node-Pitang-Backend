const express = require('express');

const AgendamentoRouter = require('./agendamento.route');

const Routes = express.Router();

Routes.use('/api', AgendamentoRouter);

module.exports = Routes;
