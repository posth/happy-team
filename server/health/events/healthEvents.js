var healthController = require("../controllers/healthController");

var EventEmitter = require('events');
var healthEventEmitter = new EventEmitter();

healthEventEmitter.on('healthPostComplete', function(err) {
    if(err){
        console.log(err);
    }
})

module.exports = healthEventEmitter;

