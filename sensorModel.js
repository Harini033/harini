const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  N: Number,
  P: Number,
  K: Number,
  temperature: Number,
  humidity: Number,
  ph: Number,
  rainfall: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);
