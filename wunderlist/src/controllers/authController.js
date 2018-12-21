const debug = require('debug')('app:authController');
const passport = require('passport');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Account = require('../config/models/account');

function authController() {
    function postSignUp(req, res) {
        const { username, password, passwordRepeat } = req.body;

        // validation of passports matching
        const passportsMatchs = password === passwordRepeat;
        if (!passportsMatchs) {
            debug(chalk.red('passports not match'));
            res.redirect('/');
        } else {
            const col = mongoose.model('Account');

            const accaunt = new Account({ username, password });
            // validate according to the model
            const validationError = accaunt.validateSync();
            if (!validationError) {
                debug('validation passed');
                Account.register(
                    { username, password },
                    passwordRepeat,
                    (err) => {
                        if (err) {
                            debug('err with registration');
                            col.findOne({ username }, (error) => {
                                if (error) {
                                    debug('cannot create accaunt');
                                } else {
                                    debug(chalk.red(`user ${username} insist`));
                                    debug(err);
                                }
                            });
                            res.redirect('/');
                        } else {
                            debug('accaunt sucsessfully registred');

                            passport.authenticate('local')(req, res, () => {
                                res.redirect('/auth/profile');
                                debug('sign up sucsessfully');
                            });
                        }
                    },
                );
            } else {
                debug('validation fails');
                if (validationError.errors.username) {
                    debug(validationError.errors.username.message);
                }
                if (validationError.errors.password) {
                    debug(validationError.errors.password.message);
                }
                res.redirect('/');
            }
        }
        return { username, password };
    }
    function getSignIn(req, res) {
        res.render(
            'signin',
            {
                title: 'Wunderlist Auth',
            },
        );
    }
    function profileMiddlewere(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
    function getProfile(req, res) {
        res.send('<h1 style="color: lightblue;"> Here gonn be your profile soon </h1>');
    }
    function getTerms(req, res) {
        res.json('There will be terms&privacy soon');
    }
    function postSignIn(req, res) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                debug('uncorrect username or password');
                return res.redirect('/auth/signin');
            }
            req.logIn(user, (error) => {
                if (error) {
                    debug('uncorrect username or password');
                    return res.redirect('/auth/signin');
                }
                debug('sign in sucsessfully');
                return res.redirect('/auth/profile');
            });
            return user;
        })(req, res);
    }
    return {
        postSignUp,
        getSignIn,
        postSignIn,
        profileMiddlewere,
        getProfile,
        getTerms,
    };
}

module.exports = authController;
