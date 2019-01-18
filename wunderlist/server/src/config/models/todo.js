/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const updateVersionKey = require('./updateVersionKey');

const { ObjectId } = mongoose.Schema.Types;

const Todo = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    list: {
        type: ObjectId,
        ref: 'List',
        required: true,
    },
    complited: {
        type: Boolean,
        default: false,
    },
});

Todo.pre('update', updateVersionKey);

Todo.pre('remove', function preRemove(next) {
    // if I import List at the top => I will not get List here
    // I will get an empty object => I import List here:
    // eslint-disable-next-line global-require
    const List = require('./list');
    List.update(
        {},
        { $pull: { todos: { $in: this._id } } },
        (err) => {
            if (err) {
                next(err);
            }
            next();
        },
    );
});

// eslint-disable-next-line prefer-arrow-callback
Todo.post('save', function postSave(todo, next) {
    // eslint-disable-next-line global-require
    const List = require('./list');
    List.findOne({ _id: todo.list._id }, (err, list) => {
        if (err) {
            next(err);
        }
        const updatedTodos = Array.from(list.todos);
        updatedTodos.push(todo._id);
        const update = Object.assign({}, { todos: updatedTodos });
        // eslint-disable-next-line no-shadow
        list.update(update, (err) => {
            if (err) {
                next(err);
            }
            next();
        });
    });
});

module.exports = mongoose.model('Todo', Todo);
