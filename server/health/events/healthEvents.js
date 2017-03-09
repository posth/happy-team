var healthController = require("../controllers/healthController");

var EventEmitter = require('events');
var healthEventEmitter = new EventEmitter();

healthEventEmitter.on('healthPostComplete', function(err) {
    if(err){
        console.log(err);
    }

    // //Setting up first promise to execute the setting last team health when a post of a user's health is received
    // var setLatestTeamHealthValue = function(getLatestTeamHealthValue) {
    //     var setLatestTeamHealthValuePromise = new Promise(function(resolve, reject) {
    //         healthController.setLatestTeamHealthValue();
    //         resolve();
    //     })
    //     return setLatestTeamHealthValuePromise;
    // } 

    // //Second promise that will follow setting the health, which will get the most recent team health to broadcast
    // var getLatestTeamHealthValue = function() {
    //     var getLatestTeamHealthValuePromise = new Promise(function(resolve, reject) {
    //         healthController.getLatestTeamHealthValue();
    //     })
    //     return getLatestTeamHealthValuePromise;
    // }

    // //Setting off the health path when a user updates their health for the team to get it
    // setLatestTeamHealthValue()
    //     .then(getLatestTeamHealthValue);
})

module.exports = healthEventEmitter;

