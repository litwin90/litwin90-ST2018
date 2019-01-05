const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Todo = new Schema({
    content: String,
});

module.exports = mongoose.model('Todo', Todo);
