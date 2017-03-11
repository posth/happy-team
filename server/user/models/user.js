var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    admin: {type:Boolean, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    healths: [{type: Schema.Types.ObjectId, ref: 'Health'}],
    questionTwoValues: [{type: Schema.Types.ObjectId, ref: 'UserQuestionTwoValue'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);