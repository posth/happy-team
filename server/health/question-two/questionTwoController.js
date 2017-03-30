var User = require('../../user/models/user');

var TeamQuestionTwoValue = require('./teamQuestionTwoModel');
var UserQuestionTwoValue = require('./userQuestionTwoModel');

var jwt = require('jsonwebtoken');

//For exporting 
var questionTwo = module.exports = {};

questionTwo.setLatestUserQuestionTwoValue = function (userInfo) {

    return new Promise(function (resolve, reject) {
        let token = userInfo.token;
        let tokenTrimmed = token.slice(7);

        var decoded = jwt.decode(tokenTrimmed);

        // Mongoose DB promise
        let userQuestionTwoPromise = User.findById(decoded.user._id).exec();

        // Using the promise
        userQuestionTwoPromise.then((user) => {

            var userQuestionTwoValue = new UserQuestionTwoValue({
                userQuestionTwoValue: userInfo['userHealth'],
                user: user
            });

            userQuestionTwoValue.save(function (err, result) {
                user.questionTwoValues.push(result);
                user.save();

                console.log('->>>!>@!@#      - saving user question two value', result.userQuestionTwoValue);
            });

            resolve();
        })
            .catch(error => {
                console.error(error);
            })
    })
}

questionTwo.setLatestTeamQuestionTwoValue = function () {

    return new Promise((resolve, reject) => {

        setTimeout(function () {

            //Mongoose DB promise
            var questionTwoPromise = User.find().populate('questionTwoValues').exec();

            questionTwoPromise.then(function (users) {
                let sum = 0;
                let totalUsers = users.length;
                var newAverage;

                users.forEach(function (user) {
                    let lastQuestionTwoObject = user['questionTwoValues'].pop();

                    let mostRecentHealth = lastQuestionTwoObject['userQuestionTwoValue'];
                    console.log('last object for each user QUESTIN TWO ----------------------', mostRecentHealth);
                    sum += mostRecentHealth;
                })

                newAverage = sum / totalUsers;

                var teamQuestionTwoValue = new TeamQuestionTwoValue({
                    teamQuestionTwoValue: newAverage,
                    currentTime: new Date()
                });

                teamQuestionTwoValue.save();

                resolve();
            }).catch(error => {
                console.error(error);
            })
        }, 100)
    })
}

questionTwo.getLatestQuestionTwoValue = function () {

    return new Promise((resolve, reject) => {
        setTimeout(function () {

            //Mongoose DB promise
            let teamQuestionTwoValue = TeamQuestionTwoValue.find().limit(1).sort({ $natural: -1 });

            //Using promise
            teamQuestionTwoValue.then(function (latestTeamHealthObjectResult) {
                let latestTeamQuestionTwoValue = latestTeamHealthObjectResult[0]['teamQuestionTwoValue'];
                console.log('------T--- lastest team health is', latestTeamHealthObjectResult[0]['teamQuestionTwoValue']);
                return resolve(latestTeamQuestionTwoValue);
            }).catch(error => {
                console.error(error);
            })
        }, 100)

    })
}