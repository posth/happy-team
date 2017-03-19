var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true},
    completed: {type: Boolean, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Goal', schema);