var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../../user/models/user');
var UserQuestionTwoValue = require('../question-two/userQuestionTwoModel');
var TeamQuestionTwoValue = require('../question-two/teamQuestionTwoModel');

//Get all question two health values for specific logged in user
router.get('/', function (req, res, next) {
    UserQuestionTwoValue.find()
        .populate('user', 'firstName')
        .exec(function (err, healths) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: healths
            });
        });
});

//Get latest health values
router.get('/latest', function (req, res, next) {
    UserQuestionTwoValue.find({ user: req.query.id })
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, health) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: health[0]
            });
        })
});

//Get latest team question two values
router.get('/team', function (req, res, next) {

    TeamQuestionTwoValue.find()
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, lastTeamQuestionTwoValue) {
            if (err) {
                return res.status(500).json({
                    title: "Error occured on getting last team health",
                    error: err
                });
            }

            if (lastTeamQuestionTwoValue[0] == undefined) {
                res.status(200).json({
                    message: 'Last team health received',
                    obj: 50
                });
            } else {
                res.status(200).json({
                    message: 'Last team health received',
                    obj: lastTeamQuestionTwoValue[0].teamHealth
                });
            }
        })
});

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
        var userQuestionTwoValue = new UserQuestionTwoValue({
            userQuestionTwoValue: req.body.currentHealth,
            user: user
        });

        userQuestionTwoValue.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on save posting health',
                    error: err
                });
            }
            user.questionTwoValues.push(result);
            user.save();

            res.status(201).json({
                message: 'Saved health',
                obj: result
            });
        });
    });
});

module.exports = router;

