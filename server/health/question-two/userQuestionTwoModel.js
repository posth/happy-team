var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../../user/models/user');

var schema = new Schema(
    {
        userQuestionTwoValue: {type: Number, required: true}, 
        user: { type: Schema.Types.ObjectId, ref: 'User'}
    }
);

module.exports = mongoose.model('UserQuestionTwoValue', schema);
