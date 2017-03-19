var Goal = require('./goalModel');

var goalsExports = module.exports = {};

//Adding new team goal to the DB from socket
goalsExports.addGoal = function (goal) {

    return new Promise(function (resolve, reject) {

        let newGoal = new Goal({
            content: goal.content,
            completed: goal.completed,
            date: goal.date
        });

        newGoal.save(function (err, result) {
            if (err) {
                console.error('Error saving team goal: ', err);
            }
        })
        resolve();
    })
}

//Getting all team goals
goalsExports.getAllGoals = function () {

    return new Promise((resolve, reject) => {

        // Mongoose DB promise from Mongo DB results
        let allTeamGoalsPromise = Goal.find().exec();

        //Using the promise
        allTeamGoalsPromise.then(function (allTeamGoalsResult) {
            return resolve(allTeamGoalsResult);
        }).catch(error => {
            console.error(error);
        })
    })
}