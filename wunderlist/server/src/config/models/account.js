/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const List = require('./list');
const updateVersionKey = require('./updateVersionKey');

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
    lists: [{ type: ObjectId, ref: 'List' }],
    email: mongoose.SchemaTypes.Email,
});

Account.pre('remove', function preRemove(next) {
    // remove lists if they have only one ref to current account:
    const listIds = this.lists;
    if (listIds.length > 0) {
        listIds.forEach((listId) => {
            List.findOne({ _id: listId }, (err, list) => {
                if (err) {
                    next(err);
                }
                // check if current list have 1 ref to account:
                if (list.accounts.length === 1) {
                    list.remove((err) => {
                        if (err) {
                            next(err);
                        }
                        next();
                    });
                }
                List.updateOne(
                    { _id: list._id },
                    { $pull: { accounts: { $in: this._id } } },
                    (err) => {
                        if (err) {
                            next(err);
                        }
                        next();
                    },
                );
            });
        });
    }
    next();
});

Account.pre('update', updateVersionKey);

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
