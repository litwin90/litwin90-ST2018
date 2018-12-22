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
            req.session.errMess = 'Passports should match';
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
                                    req.session.errMess = 'Can not to create an accaunt';
                                } else {
                                    debug(chalk.red(`user ${username} insist`));
                                    req.session.errMess = `User ${username} insist`;
                                }
                                return res.redirect('/');
                            });
                        }
                        debug('accaunt sucsessfully registred');

                        passport.authenticate('local')(req, res, () => {
                            debug('sign up sucsessfully');
                            req.session.errMess = '';
                            res.redirect('/auth/profile');
                        });
                        return err;
                    },
                );
            } else {
                debug('validation fails');
                if (validationError.errors.username) {
                    debug(validationError.errors.username.message);
                    req.session.errMess = validationError.errors.username.message;
                    return res.redirect('/auth/signup');
                }
                if (validationError.errors.password) {
                    debug(validationError.errors.password.message);
                    req.session.errMess = validationError.errors.password.message;
                    return res.redirect('/auth/signup');
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
                err: req.session.errMess,
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
        res.send('<h1 style="color: lightblue;"> Here gonn be terms & privacy soon </h1>');
    }
    function postSignIn(req, res) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                debug('uncorrect username or password');
                req.session.errMess = 'Uncorrect username or password';
                return res.redirect('/auth/signin');
            }
            req.logIn(user, (error) => {
                if (error) {
                    debug('uncorrect username or password');
                    req.session.errMess = 'Uncorrect username or password';
                    return res.redirect('/auth/signin');
                }
                debug('sign in sucsessfully');
                req.session.errMess = '';
                return res.redirect('/auth/profile');
            });
            return user;
        })(req, res);
    }
    function github() {
        passport.authenticate('github');
    }
    function githubCallBack() {
        passport.authenticate('github', {
            failureRedirect: '/auth/login',
        }, (req, res) => {
            res.redirect('/auth/profile');
        });
    }
    return {
        postSignUp,
        getSignIn,
        postSignIn,
        profileMiddlewere,
        getProfile,
        getTerms,
        github,
        githubCallBack,
    };
}

module.exports = authController;
