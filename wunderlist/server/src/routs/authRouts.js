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
    } = authController();
    authRouter.route('/signin')
        .get(getSignIn)
        .post(postSignIn);
    authRouter.route('/signup')
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
    return authRouter;
}

module.exports = router;
