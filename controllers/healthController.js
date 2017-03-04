var User = require('../models/user');
var Health = require('../models/health');

//For exporting ES5 style
var exports = module.exports = {};

var currentAverage;

function getLatestTeamHealthValue(setAverage) {

    //Testing callbacks
    User.find()
        .populate('healths')
        .exec(function (err, users) {

            let sum = 0;
            let totalUsers = users.length;

            users.forEach(function (user) {
                let lastHealthObject = user['healths'].pop();
                let mostRecentHealth = lastHealthObject['currentHealth'];
                sum += mostRecentHealth;
            })

            let newAverage = sum / totalUsers;
  
            setAverage(newAverage);
        })
}

exports.getAverage = function () {

    getLatestTeamHealthValue(function setAverage(newAverage) {
        currentAverage = newAverage;
    });

    return currentAverage;
}


