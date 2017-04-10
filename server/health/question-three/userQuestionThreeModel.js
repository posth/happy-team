var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../../user/models/user');

var schema = new Schema(
    {
        userQuestionThreeValue: {type: Number, required: true}, 
        user: { type: Schema.Types.ObjectId, ref: 'User'}
    }
);

module.exports = mongoose.model('UserQuestionThreeValue', schema);
