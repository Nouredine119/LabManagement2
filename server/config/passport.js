const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: '647073529118-gsrv7nvomh6vp0s27babj0642kesk97l.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
      
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        
        const newUser = new User({
          
          email: profile.emails[0].value,
         
          typeUser: 'guest',  
          
          googleId: profile.id,
        });

       
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        newUser.tokens.push({ token });
        await newUser.save();
        

        
        

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
