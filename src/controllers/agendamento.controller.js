/* eslint-disable class-methods-use-this */
const { AgendamentoModel } = require('../models/agendamento.model');
const { parseISO } = require('date-fns');

class AgendamentoController { 
  async index(req, res) {
    try {
      const agendamentos = await AgendamentoModel.find();

      res.send({ data: agendamentos });

    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }


  async store(req, res) {
    const { date, hour } = req.body;
    const agendamentos = await AgendamentoModel.find();
    
    const agendamentosDia = agendamentos.filter((agendamento) => agendamento.date.toString() == parseISO(date));
    console.log(agendamentosDia.length);

      if(agendamentosDia.length < 20){
        const agendamentosHora = agendamentosDia.filter((agendamentoHora) => agendamentoHora.hour == hour);
        console.log(agendamentosHora.length);
        if(agendamentosHora.length < 2){
          try {
            const agendamento = await AgendamentoModel.create(req.body);
      
            res.send({ data: agendamento });
      
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        }else{
          res.status(400).json({ message: 'Não há mais vagas neste horário' });
          
        }
      }else{
        res.status(400).json({ message: 'Não há mais vagas neste dia' });
      }
      
  }

  // eslint-disable-next-line consistent-return
  async remove(req, res) {
    const { _id } = req.params;
    console.log(_id);

    try {
      const agendamento = await AgendamentoModel.findById(_id);

      if (!agendamento) {
        return res.send({ message: 'Agendamento não existe' });
      }
      await agendamento.remove();
      res.send({ message: 'Agendamento cancelado.' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    const {
      body,
      params: { _id },
    } = req;
    try {

      const agendamento = await AgendamentoModel.findByIdAndUpdate(_id, body, { new: true });

      res.send({ data: agendamento });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new AgendamentoController();
