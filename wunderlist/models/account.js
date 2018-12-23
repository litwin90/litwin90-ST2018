const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const Account = new Schema({
    username: String,
    password: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
