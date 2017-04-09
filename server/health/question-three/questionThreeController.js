var User = require('../../user/models/user');

var TeamQuestionThreeValue = require('./teamQuestionThreeModel');
var UserQuestionThreeValue = require('./userQuestionThreeModel');

var jwt = require('jsonwebtoken');

//For exporting 
var questionThree = module.exports = {};

questionThree.setLatestUserQuestionThreeValue = function (userInfo) {

    return new Promise(function (resolve, reject) {
        let token = userInfo.token;
        let tokenTrimmed = token.slice(7);

        var decoded = jwt.decode(tokenTrimmed);

        // Mongoose DB promise
        let userQuestionThreePromise = User.findById(decoded.user._id).exec();

        // Using the promise
        userQuestionThreePromise.then((user) => {

            var userQuestionThreeValue = new UserQuestionThreeValue({
                userQuestionThreeValue: userInfo['userHealth'],
                user: user
            });

            userQuestionThreeValue.save(function (err, result) {
                user.questionThreeValues.push(result);
                user.save();
            });

            resolve();
        })
            .catch(error => {
                console.error(error);
            })
    })
}

questionThree.setLatestTeamQuestionThreeValue = function () {

    return new Promise((resolve, reject) => {

        setTimeout(function () {

            //Mongoose DB promise
            var questionThreePromise = User.find().populate('questionThreeValues').exec();

            questionThreePromise.then(function (users) {
                let sum = 0;
                let totalUsers = users.length;
                var newAverage;

                users.forEach(function (user) {
                    let lastQuestionThreeObject = user['questionThreeValues'].pop();

                    let mostRecentHealth = lastQuestionThreeObject['userQuestionThreeValue'];
                    sum += mostRecentHealth;
                })

                newAverage = sum / totalUsers;

                var teamQuestionThreeValue = new TeamQuestionThreeValue({
                    teamQuestionThreeValue: newAverage,
                    currentTime: new Date()
                });

                teamQuestionThreeValue.save();

                resolve();
            }).catch(error => {
                console.error(error);
            })
        }, 100)
    })
}

questionThree.getLatestQuestionThreeValue = function () {

    return new Promise((resolve, reject) => {
        setTimeout(function () {

            //Mongoose DB promise
            let teamQuestionThreeValue = TeamQuestionThreeValue.find().limit(1).sort({ $natural: -1 });

            //Using promise
            teamQuestionThreeValue.then(function (latestTeamHealthObjectResult) {
                let latestTeamQuestionThreeValue = latestTeamHealthObjectResult[0]['teamQuestionThreeValue'];
                return resolve(latestTeamQuestionThreeValue);
            }).catch(error => {
                console.error(error);
            })
        }, 100)

    })
}