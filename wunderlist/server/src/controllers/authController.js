const passport = require('passport');
const Account = require('../config/models/account');

function authController() {
    function postSignUp(req, res) {
        const { username, password, passwordRepeat } = req.body;

        if (password !== passwordRepeat) {
            req.session.errMess = 'Passports should match';
            res.redirect('/');
        }

        // eslint-disable-next-line consistent-return
        Account.register({ username, password }, passwordRepeat, (error) => {
            if (error) {
                req.session.errMess = error.message;
                return res.redirect('/');
            }
            passport.authenticate('local')(req, res, (err) => {
                if (err) {
                    req.session.errMess = err.message;
                    return res.redirect('/');
                }
                req.session.errMess = '';
                return res.redirect('/auth/profile');
            });
        });
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
        // eslint-disable-next-line consistent-return
        passport.authenticate('local', (err, user) => {
            if (err) {
                req.session.errMess = 'Uncorrect username or password';
                return res.send(JSON.stringify({ error: req.session.errMess }));
            }
            req.logIn(user, (error) => {
                if (error) {
                    req.session.errMess = 'Uncorrect username or password';
                    return res.send(JSON.stringify({ error: req.session.errMess }));
                }
                req.session.errMess = '';
                return res.send(JSON.stringify(req.user));
            });
        })(req, res);
    }
    function getLogOut(req, res) {
        req.logOut();
        res.send(JSON.stringify({ isLogOuted: true }));
    }
    function auth(req, res, service) {
        passport.authenticate(service, {
            scope: ['profile'],
        })(req, res);
    }
    function authCb(req, res, service) {
        passport.authenticate(service, {
            failureRedirect: '/auht/login',
            successRedirect: '/auth/profile',
        })(req, res);
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
