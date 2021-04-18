const express = require('express');

const AgendamentoController = require('../controllers/agendamento.controller');

const Routes = express.Router();

Routes.get('/agendamentos', AgendamentoController.index);
Routes.post('/agendamentos', AgendamentoController.store);
Routes.delete('/agendamentos/:_id', AgendamentoController.remove);
Routes.put('/agendamentos/:_id', AgendamentoController.update);

module.exports = Routes;
