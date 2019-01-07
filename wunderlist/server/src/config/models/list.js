const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// const Todo = require('./toto');

const { ObjectId } = mongoose.Schema.Types;

const List = new Schema({
    name: String,
    users: [ObjectId],
    todos: [ObjectId],
});

module.exports = mongoose.model('List', List);
