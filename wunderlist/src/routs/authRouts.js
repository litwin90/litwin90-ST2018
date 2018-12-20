const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router() {
    const {
        getSignIn,
        postSignUp,
        profileMiddlewere,
        getProfile,
        getTerms,
    } = authController();
    authRouter.route('/signin')
        .get(getSignIn)
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/',
        }));
    authRouter.route('/signup')
        .post(postSignUp);
    authRouter.route('/profile')
        .all(profileMiddlewere)
        .get(getProfile);
    authRouter.route('/terms&privacy')
        .get(getTerms);
    return authRouter;
}

module.exports = router;
