var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
	content: {
		type: String, 
		required: true
	},
	date: {
		type: String, 
		required: true
	}
}, { collection: 'todo' });

module.exports = Todo;