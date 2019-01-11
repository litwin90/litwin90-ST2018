const Account = require('./models/account');

module.exports = service => (accessToken, refreshToken, profile, cb) => {
    const id = `${service}id`;
    Account.findOne({ [id]: profile.id }, (err, account) => {
        if (err) {
            cb(err, account);
        }
        if (account) {
            cb(null, account);
        } else {
            Account.create({
                username: profile.displayName,
                [id]: profile.id,
            // eslint-disable-next-line no-shadow
            }, (err, account) => {
                if (err) {
                    cb(err, account);
                }
                cb(null, account);
            });
        }
    });
};
