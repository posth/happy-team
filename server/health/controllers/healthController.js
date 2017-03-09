var Health = require('../models/health');

var User = require('../../user/models/user');
var TeamHealth = require('../../health/models/teamHealth');
var jwt = require('jsonwebtoken');

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

exports.setLatestUserHealthValue = function (userInfo) {

    let token = userInfo.token;
    let tokenTrimmed = token.slice(7);

    var decoded = jwt.decode(tokenTrimmed);

    // Mongoose DB promise
    let userHealthPromise = User.findById(decoded.user._id).exec();

    // Using the promise
    userHealthPromise.then(function (user) {

        var health = new Health({
            currentHealth: userInfo['userHealth'],
            user: user
        });

        health.save(function (err, result) {
            user.healths.push(result);
            user.save();

            console.log('->>>!>@!@#      - saving user health', result.currentHealth);
        });

        // resolve();
    })
}




