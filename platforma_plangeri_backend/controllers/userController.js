const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, 'secret', { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsedCities = async (req, res) => {
  try {
    const users = await User.find({ role: 'primarie' }).select('name -_id');
    const usedCities = users.map(user => user.name);
    res.status(200).json(usedCities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};