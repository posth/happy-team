var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        teamQuestionTwoValue: {type: Number, required: true},
        currentTime: {type: Date, required: true}
    }
);

module.exports = mongoose.model('TeamQuestionTwoValue', schema);