const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Calculation Schema
const calculationSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User
    required: true,
  },
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
