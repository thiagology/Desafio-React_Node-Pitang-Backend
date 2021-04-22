/* eslint-disable class-methods-use-this */
const { AgendamentoModel } = require('../models/agendamento.model');
const { parseISO, isAfter, differenceInYears } = require('date-fns');

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
    const { date, hour, birth } = req.body;
    const agendamentos = await AgendamentoModel.find();
    const currentBirth = parseISO(birth);
    
    const agendamentosDia = agendamentos.filter((agendamento) => agendamento.date.toString() == parseISO(date));

    // verifica se há 20 agendamentos em um dia
    if (agendamentosDia.length < 20) {
      const agendamentosHora = agendamentosDia.filter((agendamentoHora) => agendamentoHora.hour == hour);
      
      
      //verifica se há 2 agendamentos em um horário
      if (agendamentosHora.length < 2) {
        try {
          const agendamento = await AgendamentoModel.create(req.body);

          res.send({ data: agendamento });

        } catch (error) {c
          res.status(400).json({ message: error.message });
        }
      }
      const oldest = agendamentosHora.sort((a, b) => Date.parse(b) - Date.parse(a)); // ordernar por idade
      const oldestAge = differenceInYears( new Date(), oldest[0].birth); // idade do mais velho do array
      const currentAge = differenceInYears( new Date(), currentBirth); // idade do paciente atual

      // se o idoso for mais velho que agendamento mais velho
       if( currentAge >= 60 && oldestAge < currentAge ){

        //remover o mais jovem
        const _id = oldest[0]._id;
        console.log(_id);
        const agendamento = await AgendamentoModel.findById(_id);
        await agendamento.remove();

        // agenda o idoso no lugar
       try {
          const agendamento = await AgendamentoModel.create(req.body);

          res.send({ data: agendamento });

        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
       else {
        res.status(400).json({ message: 'Não há mais vagas neste horário' });
      }
    } else {
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
