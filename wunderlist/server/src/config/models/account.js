const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: {
        type: String,
        validate: {
            validator: (v) => {
                const regex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
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
        required: true,
    },
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
