const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calculationSchema = new Schema({
  calculation_expression: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const Calculation = mongoose.model('Calculation', calculationSchema);
module.exports = Calculation;
