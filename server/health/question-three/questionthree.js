var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var User = require('../../user/models/user');
var UserQuestionThreeValue = require('../question-three/userQuestionThreeModel');
var TeamQuestionThreeValue = require('../question-three/teamQuestionThreeModel');

//Get all question three health values for specific logged in user
router.get('/', function (req, res, next) {
    UserQuestionThreeValue.find()
        .populate('user', 'firstName')
        .exec(function (err, healths) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            if (_.isEmpty(healths)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: healths
            });
        });
});

// Get latest health values
router.get('/latest', function (req, res, next) {
    UserQuestionThreeValue.find({ user: req.query.id })
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, health) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            if (_.isEmpty(health)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: health[0].userQuestionThreeValue
            });
        })
});

// Get latest team question three values
router.get('/team', function (req, res, next) {

    TeamQuestionThreeValue.find()
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, lastTeamQuestionThreeValue) {
            if (err) {
                return res.status(500).json({
                    title: "Error occured on getting last team health",
                    error: err
                });
            }
            if (_.isEmpty(lastTeamQuestionThreeValue)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Last team health received',
                obj: lastTeamQuestionThreeValue[0].teamQuestionThreeValue
            });
        })
});

//Get all team values for question three
router.post('/questionthreeteamvalues', function (req, res, next) {

    TeamQuestionThreeValue.find()
        .exec(function (err, allTeamQuestionThreeValues) {
            if (err) {
                return res.status(500).json({
                    title: "Error occured on getting on team health values for question three",
                    error: err
                })
            }
            //Checking if empty again
            if (_.isEmpty(allTeamQuestionThreeValues)) {
                return res.status(200).json({
                    message: 'There are no team healths!'
                });
            }
            res.status(200).json({
                message: 'Here are all the last team healths',
                obj: allTeamQuestionThreeValues
            })

        })
})

router.post('/', function (req, res, next) {

    //Decoding the token from client to match user
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred on post',
                error: err
            });
        }
        var userQuestionThreeValue = new UserQuestionThreeValue({
            userQuestionThreeValue: req.body.currentHealth,
            user: user
        });

        userQuestionThreeValue.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on save posting health',
                    error: err
                });
            }
            user.questionThreeValues.push(result);
            user.save();

            res.status(201).json({
                message: 'Saved health',
                obj: result
            });
        });
    });
});

module.exports = router;

