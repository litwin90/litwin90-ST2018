const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Account = require('./models/account');
const keys = require('./keys');
const googleVerify = require('./serveces/googleVerify');

function verify(accessToken, refreshToken, profile, done) {
    process.nextTick(() => done(null, profile));
}

module.exports = function passportConfig(app) {
    mongoose.connect(keys.mongodb.dbURL, { useNewUrlParser: true });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(Account.authenticate()));
    passport.use(new GitHubStrategy(keys.github, verify));
    passport.use(new GoogleStrategy(keys.google, googleVerify));

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
};
