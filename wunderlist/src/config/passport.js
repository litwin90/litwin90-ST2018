const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./models/account');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(Account.authenticate()));

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    mongoose.connect('mongodb://localhost/Wunderlist');
};
