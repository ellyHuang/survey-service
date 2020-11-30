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
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done)=>{
            User.findOne({ googleId:profile.id}).then((exsitingUser)=>{
                if(exsitingUser){
                    //this profile ID is already in the database
                    done(null, exsitingUser);
                }else{
                    new User ({googleId: profile.id}).save().then(user=>{done(null, user)});
                }
            });
        }
    )
);

