const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router() {
    const {
        getSignIn,
        postSignIn,
        postSignUp,
        profileMiddlewere,
        getProfile,
        getTerms,
        github,
        githubCallBack,
        signInUpMiddlewere,
        getLogOut,
        google,
        googleCb,
    } = authController();
    authRouter.route('/signin')
        .all(signInUpMiddlewere)
        .get(getSignIn)
        .post(postSignIn);
    authRouter.route('/signup')
        .all(signInUpMiddlewere)
        .post(postSignUp);
    authRouter.route('/profile')
        .all(profileMiddlewere)
        .get(getProfile);
    authRouter.route('/terms&privacy')
        .get(getTerms);
    authRouter.route('/github')
        .get(github);
    authRouter.route('/github/callback')
        .get(githubCallBack);
    authRouter.route('/logout')
        .get(getLogOut);
    authRouter.route('/google')
        .get(google);
    authRouter.route('/google/callback')
        .get(googleCb);
    return authRouter;
}

module.exports = router;
