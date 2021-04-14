const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
  },
  {
    timestamps: true,
  },
);

const AgendamentoModel = mongoose.model('agendamento', AgendamentoSchema);

module.exports = { AgendamentoSchema, AgendamentoModel };
