const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        }, (username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'Wunderlist';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useNewUrlParser: true });

                    debug('Connected to db');
                    // set dbname
                    const db = client.db(dbName);
                    const collection = db.collection('users');

                    // looking for user in db:
                    const user = await collection.findOne({ username });
                    // check for correct password:
                    if (user.password === password) {
                        done(null, user);
                        debug('login sucsess');
                    } else {
                        done(null, false);
                        debug('login faild');
                    }
                } catch (err) {
                    debug('Can not connect to mongo server');
                }
                client.close();
            }());
        },
    ));
};
