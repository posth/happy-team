var User = require('../../user/models/user');
var TeamHealth = require('../../health/models/teamHealth');

//For exporting ES5 style
var exports = module.exports = {};

exports.setLatestTeamHealthValue = function () {

    //Mongoose DB promise
    var healthsPromise = User.find().populate('healths').exec();

    healthsPromise.then(function (users) {
        let sum = 0;
        let totalUsers = users.length;
        var newAverage;

        users.forEach(function (user) {
            let lastHealthObject = user['healths'].pop();
            let mostRecentHealth = lastHealthObject['currentHealth'];

            console.log('last object for each user ----------------------', mostRecentHealth);
            sum += mostRecentHealth;
        })

        newAverage = sum / totalUsers;

        var teamHealth = new TeamHealth({
            teamHealth: newAverage,
            currentTime: new Date()
        });

        teamHealth.save();
    })

}

exports.getLatestTeamHealthValue = function () {

    //Mongoose DB promise
    let teamHealthPromise = TeamHealth.find().limit(1).sort({ $natural: -1 });

    //Using promise
    teamHealthPromise.then(function (latestTeamHealthObjectResult) {
        let latestTeamHealthValue = latestTeamHealthObjectResult[0]['teamHealth'];
        console.log('------T--- lastest team health is', latestTeamHealthObjectResult[0]['teamHealth']);
        resolve(latestTeamHealthValue);
    })

}




