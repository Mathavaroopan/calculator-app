const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Keep bcrypt for password hashing

const User = require('./models/user');
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

app.post('/signup', async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  try {
    let user = await User.findOne({ user_email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    user = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
    });

    await user.save();

    res.json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.json({ msg: 'Login successful', user_id: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/add-calculation', async (req, res) => {
  const { user_id, calculation_expression, result } = req.body;

  try {
    const calculation = new Calculation({
      user_id,
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

app.get('/history/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const calculations = await Calculation.find({ user_id }).sort({ datetime: -1 });
    res.json(calculations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
