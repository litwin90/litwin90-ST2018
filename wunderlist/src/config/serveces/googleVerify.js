const debug = require('debug')('app:google verify');
const Account = require('../models/account');

module.exports = (accessToken, refreshToken, profile, cb) => {
    debug('passport callback fired');
    (async function createAccaunt() {
        try {
            let accaunt = await Account.findOne({ googleid: profile.id });
            if (accaunt) {
                // done(null, accaunt);
                debug(`user ${accaunt.username} already insist in db`);
                cb(null, accaunt);
            } else {
                accaunt = await new Account({
                    username: profile.displayName,
                    googleid: profile.id,
                }).save();
                // done(null, accaunt);
                debug(`add new user to db : ${accaunt.username}`);
                cb(null, accaunt);
            }
        } catch (err) {
            debug('can not to find or create user');
            debug(`Error: ${err}`);
        }
    }());
};
