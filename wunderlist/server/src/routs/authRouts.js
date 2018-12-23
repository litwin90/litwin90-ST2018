const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router() {
    const {
        postSignIn,
        postSignUp,
    } = authController();
    authRouter.route('/signin')
        .post(postSignIn);
    authRouter.route('/signup')
        .post(postSignUp);
    return authRouter;
}

module.exports = router;
