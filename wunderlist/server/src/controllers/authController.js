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
            // res.redirect('/');
            res.send(JSON.stringify({ error: req.session.errMess }));
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
                                    debug(chalk.red(`user ${chalk.green(username)} insist`));
                                    req.session.errMess = `User ${username} insist`;
                                }
                                // return res.redirect('/');
                                return res.send(JSON.stringify({ error: req.session.errMess }));
                            });
                        } else {
                            debug('accaunt sucsessfully registred');

                            passport.authenticate('local')(req, res, () => {
                                debug('sign up sucsessfully');
                                req.session.errMess = '';
                                res.send(JSON.stringify(req.user));
                            });
                        }
                        return err;
                    },
                );
            } else {
                debug('validation fails');
                if (validationError.errors.username) {
                    debug(chalk.red(validationError.errors.username.message));
                    req.session.errMess = validationError.errors.username.message;
                    // return res.redirect('/auth/signup');
                    return res.send(
                        JSON.stringify({ error: validationError.errors.username.message }),
                    );
                }
                if (validationError.errors.password) {
                    debug(chalk.red(validationError.errors.password.message));
                    req.session.errMess = validationError.errors.password.message;
                    // return res.redirect('/auth/signup');
                    return res.send(JSON.stringify({ error: validationError.errors.password }));
                }
                // res.redirect('/');
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
        res.render(
            'profile',
            {
                title: 'Wunderlist',
                username: req.user.username,
            },
        );
    }
    function getTerms(req, res) {
        res.send('<h1 style="color: lightblue;"> Here gonn be terms & privacy soon </h1>');
    }
    function postSignIn(req, res) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                debug('uncorrect username or password');
                req.session.errMess = 'Uncorrect username or password';
                // return res.redirect('/auth/signin');
                return res.send(JSON.stringify({ error: req.session.errMess }));
            }
            req.logIn(user, (error) => {
                if (error) {
                    debug('uncorrect username or password');
                    req.session.errMess = 'Uncorrect username or password';
                    // return res.redirect('/auth/signin');
                    return res.send(JSON.stringify({ error: req.session.errMess }));
                }
                debug('sign in sucsessfully');
                req.session.errMess = '';
                return res.send(JSON.stringify(req.user));
                // return res.redirect('/auth/profile');
            });
            return user;
        })(req, res);
    }
    function getLogOut(req, res) {
        req.logOut();
        debug('logout');
        // res.redirect('/');
        res.send(JSON.stringify({ isLogOuted: true }));
    }
    function auth(req, res, service) {
        passport.authenticate(service, {
            scope: ['profile'],
        })(req, res);
        debug(`send request to ${chalk.green(service)} auth`);
    }
    function authCb(req, res, service) {
        // debug(`get response from ${chalk.green(service)} auth`);
        // passport.authenticate(service, (err, user) => {
        //     if (err) {
        //         debug(`error with ${service} auth`);
        //         return res.send(JSON.stringify({ error: err }));
        //     }
        //     if (!user) {
        //         debug(`don get user in ${service} auth`);
        //         return res.send(JSON.stringify({ error: err }));
        //     }
        //     debug(`logged in as ${user}`);
        //     // return res.send(JSON.stringify(user))
        //     return res.send(JSON.stringify({ user: user.username }));
        // })(req, res);
        // debug(`send 2nd request to ${chalk.green(service)} auth`);

        debug(`get response from ${chalk.green(service)} auth`);
        passport.authenticate(service, {
            failureRedirect: '/auht/login',
            successRedirect: '/auth/profile',
        })(req, res);
        debug(`send 2nd request to ${chalk.green(service)} auth`);
    }

    function github(req, res) {
        auth(req, res, 'github');
    }
    function githubCallBack(req, res) {
        authCb(req, res, 'github');
    }
    function google(req, res) {
        auth(req, res, 'google');
    }
    function googleCb(req, res) {
        authCb(req, res, 'google');
    }
    function signInUpMiddlewere(req, res, next) {
        if (req.user) {
            res.redirect('/profile');
        } else {
            next();
        }
    }
    return {
        google,
        googleCb,
        postSignUp,
        getSignIn,
        postSignIn,
        profileMiddlewere,
        getProfile,
        getTerms,
        github,
        githubCallBack,
        signInUpMiddlewere,
        getLogOut,
    };
}

module.exports = authController;
