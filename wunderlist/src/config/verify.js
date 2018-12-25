const debug = require('debug')('app:verify');
const Account = require('./models/account');

module.exports = service => (accessToken, refreshToken, profile, cb) => {
    debug('passport callback fired');
    (async function createAccaunt() {
        try {
            const id = `${service}id`;
            let accaunt = await Account.findOne({ [id]: profile.id });
            if (accaunt) {
                debug(`user ${accaunt.username} already insist in db`);
                cb(null, accaunt);
            } else {
                accaunt = await new Account({
                    username: profile.displayName,
                    [id]: profile.id,
                }).save();
                debug(`add new user to db : ${accaunt.username}`);
                cb(null, accaunt);
            }
        } catch (err) {
            debug('can not to find or create user');
            debug(`Error: ${err}`);
        }
    }());
};
