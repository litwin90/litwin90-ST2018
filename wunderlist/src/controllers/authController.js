const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function authController() {
    function postSignUp(req, res) {
        debug(req.body);
        res.json(req.body);
    }
    function getSignIn(req, res) {
        res.render(
            'signin',
            {
                title: 'Wunderlist Auth',
            },
        );
    }
    function postSignIn(req, res) {
        debug(req.body);
        res.json(req.body);
    }
    return {
        postSignUp,
        getSignIn,
        postSignIn,
    };
}

module.exports = authController;
