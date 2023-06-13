const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('./connectdb');
const UserModel = require('./models/user');



require('./auth/auth');

const routes = require('./routes/user');
const secureRoute = require('./routes/profile');
const posts = require('./routes/blog')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/', routes);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/posts', passport.authenticate('jwt', { session: false }), posts);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3001, () => {
  console.log('Server started.')
});

module.exports = app
