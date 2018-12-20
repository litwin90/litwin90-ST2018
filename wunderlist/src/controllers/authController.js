const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authController');

function authController() {
    function postSignUp(req, res) {
        debug(`req.body: { name: ${req.body.username}, password: ${req.body.password} }`);
        // create user
        const { username, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'Wunderlist';

        (async function createUser() {
            let client;
            try {
                // create connection
                client = await MongoClient.connect(url, { useNewUrlParser: true });

                // set dbname
                const db = client.db(dbName);

                // smth like create table named users
                const collection = await db.collection('users');
                const user = { username, password };

                const userInsist = await collection.findOne({ username });
                if (!userInsist) {
                    if (req.body.password === req.body['password-repeat']) {
                        const result = await collection.insertOne(user);
                        debug('new user added to db');

                        // login under user name and password
                        req.login(result.ops[0], () => {
                            res.redirect('/auth/profile');
                        });
                    } else {
                        debug('passwords are not the same');
                        res.json('passwords are not the same');
                    }
                } else {
                    debug(`user with name ${username} already insist`);
                    res.json('user in collection');
                }
            } catch (err) {
                debug('Can not connect to mongo server');
            }
            client.close();
        }());
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
        res.json(req.user);
    }
    function getTerms(req, res) {
        res.json('There will be terms&privacy soon');
    }
    return {
        postSignUp,
        getSignIn,
        profileMiddlewere,
        getProfile,
        getTerms,
    };
}

module.exports = authController;
