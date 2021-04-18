const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    date: Date,
    hour: String,
    birth: Date,
    isCompleted: Boolean,
  },
  {
    timestamps: true,
  },
);

const AgendamentoModel = mongoose.model('agendamento', AgendamentoSchema);

module.exports = { AgendamentoSchema, AgendamentoModel };
