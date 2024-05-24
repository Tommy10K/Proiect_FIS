const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const db = 'mongodb+srv://albertopopescu:fortasteaua27@cluster0.fr5wmgt.mongodb.net/platforma_plangeri?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', require('./routes/users'));
app.use('/api/complaints', require('./routes/complaints'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
