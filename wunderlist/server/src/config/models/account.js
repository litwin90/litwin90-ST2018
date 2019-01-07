const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const privateFields = require('./privateFields');

const { ObjectId } = mongoose.Schema.Types;

const Account = new Schema({
    username: {
        type: String,
        validate: {
            validator: (v) => {
                const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._а-яА-Я\s]+(?<![_.])$/;
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid user name!`,
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid password!`,
        },
    },
    googleid: String,
    githubid: String,
    lists: [ObjectId],
    email: mongoose.SchemaTypes.Email,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
