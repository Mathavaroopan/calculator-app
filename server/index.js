const express = require('express');
const mongoose = require('mongoose');
const Calculation = require('./models/calculations');

const app = express();
app.use(express.json());
require('dotenv').config();

mongoose.connect(`mongodb+srv://Mathavaroopan:${process.env.MONGO_PASS}@cluster0.8fy3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.post('/add-calculation', async (req, res) => {
  const { calculation_expression, result } = req.body;

  try {
    const calculation = new Calculation({
      calculation_expression,
      result,
    });

    await calculation.save();
    res.json({ msg: 'Calculation added to history' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/history', async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ datetime: -1 });
    res.json(calculations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
