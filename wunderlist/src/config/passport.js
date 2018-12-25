const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Account = require('./models/account');
const keys = require('./keys');
const googleVerify = require('./serveces/googleVerify');
const githubVerify = require('./serveces/githubVerify');

module.exports = function passportConfig(app) {
    mongoose.connect(keys.mongodb.dbURL, { useNewUrlParser: true });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(Account.authenticate()));
    passport.use(new GitHubStrategy(keys.github, githubVerify));
    passport.use(new GoogleStrategy(keys.google, googleVerify));

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
};
