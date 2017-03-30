var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var User = require('./user/models/user');
var Health = require('./health/question-one/healthModel');
var TeamHealth = require('./health/question-one/teamHealthModel');
var UserQuestionTwoValue = require('./health/question-two/userQuestionTwoModel');
var TeamUserQuestionTwoValue = require('./health/question-two/teamQuestionTwoModel');
var Message = require('./messages/models/message');


router.get('/', function (req, res, next) {
    res.render('index');
});

//On each route request to the root of the application, this method is used
router.use('/', function (req, res, next) {
    //Check if use is empty, if it is it is app's first init and an admin is created as the first user by default
    console.log('--------------------no user check');
    User.find()
        .exec(function (err, users) {
            if (_.isEmpty(users)) {
                console.log('-----------------> no users!');
                var admin = new User({
                    firstName: 'Admin',
                    lastName: 'Admin',
                    password: bcrypt.hashSync('admin123', 10),
                    email: 'admin@admin.com',
                    admin: true,
                    healths: [],
                    messages: [],
                    questionTwoValues: []
                });

                //Pushing a default question one value at the start
                var health = new Health({
                    currentHealth: 50,
                    user: admin
                });
                admin.healths.push(health);
                health.save();

                //Save a team result
                var teamHealthInit = new TeamHealth({
                    teamHealth: 50,
                    currentTime: new Date()
                });
                teamHealthInit.save();

                //Pushing a default question two value at the start
                var userQuestionTwoValue = new UserQuestionTwoValue({
                    userQuestionTwoValue: 50,
                    user: admin
                });
                admin.questionTwoValues.push(userQuestionTwoValue);
                userQuestionTwoValue.save();

                //Save a team result
                var teamUserQuestionTwoValueInit = new TeamUserQuestionTwoValue({
                    teamQuestionTwoValue: 50,
                    currentTime: new Date()
                });
                teamUserQuestionTwoValueInit.save();

                var message = new Message({
                    content: 'Let there be team!',
                    user: admin
                });

                message.save();
                admin.messages.push(message);

                admin.save();
            }
        })

    next();

});

module.exports = router;
