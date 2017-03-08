var User = require('../../user/models/user');
var TeamHealth = require('../../health/models/teamHealth');

//For exporting ES5 style
var exports = module.exports = {};

exports.setLatestTeamHealthValue = function () {


    setTimeout(function () {
        //Generate promise from MongoDB Query
        function getHealths() {
            var healthsPromise = User.find().populate('healths').exec();
            return healthsPromise;
        }

        //Use the promise
        var healthsPromiseResult = getHealths();

        //Grab the data from the promise
        healthsPromiseResult.then(function (users) {
            let sum = 0;
            let totalUsers = users.length;
            var newAverage;

            users.forEach(function (user) {
                let lastHealthObject = user['healths'].pop();

                console.log('----f---latest health', lastHealthObject);

                let mostRecentHealth = lastHealthObject['currentHealth'];
                sum += mostRecentHealth;
            })

            newAverage = sum / totalUsers;

            var teamHealth = new TeamHealth({
                teamHealth: newAverage,
                currentTime: new Date()
            });

            teamHealth.save();

            console.log('---------------health controller average model ->', teamHealth);
        })
    }, 100);





}




