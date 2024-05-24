const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
  },
  ensurePrimarie: function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      if (decoded.role !== 'primarie') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  }
};
