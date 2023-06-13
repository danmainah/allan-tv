const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user');

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'username',
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async ( req, email, password, done) => {
        console.log(req.body.username);
        try {
          const user = await UserModel.create({username: req.body.username, email, password});
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  // ...

passport.use(
    'login',
    new localStrategy(
      {
        emailField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
