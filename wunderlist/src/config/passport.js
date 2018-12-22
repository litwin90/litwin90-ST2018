const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const Account = require('./models/account');
const gitHubConfig = require('./gitHubConfig');

function verify(accessToken, refreshToken, profile, done) {
    process.nextTick(() => done(null, profile));
}

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(Account.authenticate()));
    passport.use(new GitHubStrategy(gitHubConfig, verify));

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    mongoose.connect('mongodb://localhost/Wunderlist', { useNewUrlParser: true });
};
