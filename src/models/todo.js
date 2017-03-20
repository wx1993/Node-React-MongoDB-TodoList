var mongoose = require('mongoose');
var TodoSchema = require('../schemas/todo');
var TodoBox = mongoose.model('TodoBox', TodoSchema);

module.exports = TodoBox;