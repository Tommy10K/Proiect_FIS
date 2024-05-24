const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const User = require('./models/User');  

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://albertopopescu:fortasteaua27@cluster0.fr5wmgt.mongodb.net/platforma_plangeri?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', require('./routes/users'));
app.use('/api/complaints', require('./routes/complaints'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('SIGINT', () => {
  mongoose.disconnect()
    .then(() => {
      console.log('MongoDB disconnected');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error during disconnection:', err);
      process.exit(1);
    });
});
