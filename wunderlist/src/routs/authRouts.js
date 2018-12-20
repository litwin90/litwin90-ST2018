const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRouts');
const passport = require('passport');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router() {
    const { getSignIn, postSignIn, postSignUp } = authController();
    authRouter.route('/signin')
        .get(getSignIn)
        .post(postSignIn);
    authRouter.route('/signup')
        .post(postSignUp);
    return authRouter;
}

module.exports = router;
