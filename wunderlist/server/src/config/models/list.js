/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Todo = require('./todo');
const updateVersionKey = require('./updateVersionKey');

const { ObjectId } = mongoose.Schema.Types;

const List = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 24,
    },
    accounts: [{ type: ObjectId, ref: 'Account' }],
    todos: [{ type: ObjectId, ref: 'Todo' }],
});

List.pre('update', updateVersionKey);

List.pre('remove', function preRemove(next) {
    // if I import Account at the top => I will not get Account here
    // I will get an empty object => I import Account here:
    // eslint-disable-next-line global-require
    const Account = require('./account');
    // remove all todos in current list:
    const todosId = this.todos;
    todosId.forEach((todoId) => {
        Todo.findOne({ _id: todoId }, (err, todo) => {
            if (err) {
                next(err);
            }
            todo.remove((err) => {
                if (err) {
                    next(err);
                }
                next();
            });
        });
    });

    // update accounts with ref to list:
    Account.update(
        {},
        { $pull: { lists: { $in: this._id } } },
        { multi: true },
        (err) => {
            if (err) {
                next(err);
            }
            next();
        },
    );
});


// eslint-disable-next-line prefer-arrow-callback
List.post('save', function postInit(list, next) {
    // eslint-disable-next-line global-require
    const Account = require('./account');
    Account.findOne({ _id: list.accounts[0] }, (err, account) => {
        if (err) {
            next(err);
        }
        const updatedLists = Array.from(account.lists);
        updatedLists.push(list._id);
        const update = Object.assign({}, { lists: updatedLists });
        account.update(update, (err) => {
            if (err) {
                next(err);
            }
            next();
        });
    });
});

module.exports = mongoose.model('List', List);
