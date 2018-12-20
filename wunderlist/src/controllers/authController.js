const debug = require('debug')('app:authController');
const passport = require('passport');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Account = require('../config/models/account');

function authController() {
    function postSignUp(req, res) {
        const { username, password } = req.body;

        const col = mongoose.model('Account');
        Account.register(new Account({ username }), password, (err, account) => {
            if (err) {
                col.findOne({ username }, (error, user) => {
                    if (error) {
                        debug('cannot create accaunt');
                    } else {
                        debug(chalk.red(`user ${user.username} insist`));
                    }
                });
                return res.redirect('/');
            }

            passport.authenticate('local')(req, res, () => {
                debug('sign up sucsessfully');
                res.redirect('/auth/profile');
            });
            return account;
        });
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
        passport.authenticate('local')(req, res, () => {
            debug('sign ip sucsessfully');
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
    };
}

module.exports = authController;
