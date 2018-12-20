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
    return authRouter;
}

module.exports = router;
