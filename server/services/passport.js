const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{done(null,user)});
});


passport.use(
    new googleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
            proxy: true
        },
        async (accessToken, refreshToken, profile, done)=>{
            const exsitingUser = await User.findOne({ googleId:profile.id});
            if (exsitingUser){
                return done(null, exsitingUser);
            }
            const newUser = await new User({googleId: profile.id}).save()
            done(null, newUser)
        },
    )
);

