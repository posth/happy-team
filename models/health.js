var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema(
    {
        currentHealth: {type: Number, required: true},
        user: { type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        capped: {
            size: 1024,
            max: 100
        }
    }
);

module.exports = mongoose.model('Health', schema);