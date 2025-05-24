const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/farming', { useNewUrlParser: true, useUnifiedTopology: true });

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

const SensorData = mongoose.model('SensorData', SensorSchema);

app.post('/sensor-data', async (req, res) => {
  const newData = new SensorData(req.body);
  await newData.save();

  // Send to AI model
  const response = await axios.post('http://localhost:5000/predict', req.body);
  res.json({ message: 'Data saved and prediction made', crop: response.data.recommended_crop });
});

app.get('/data', async (req, res) => {
  const data = await SensorData.find().sort({ timestamp: -1 });
  res.json(data);
});

app.listen(3001, () => console.log('Server running on port 3001'));
