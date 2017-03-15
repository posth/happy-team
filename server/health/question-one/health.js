var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var User = require('../../user/models/user');
var Health = require('./healthModel');
var TeamHealth = require('./teamHealthModel');

//Get all health values
router.get('/', function (req, res, next) {
    Health.find()
        .populate('user', 'firstName')
        .exec(function (err, healths) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            if(_.isEmpty(healths)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Success getting healths.',
                obj: healths
            });
        });
});

// Get latest health values
router.get('/latest', function (req, res, next) {
    Health.find({ user: req.query.id })
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, health) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting user',
                    error: err
                });
            }
            if(_.isEmpty(health)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: health[0]
            });
        })
});

//Get latest team health values
router.get('/team', function (req, res, next) {

    TeamHealth.find()
        .limit(1)
        .sort({ $natural: -1 })
        .exec(function (err, lastTeamHealth) {
            if (err) {
                return res.status(500).json({
                    title: "Error occured on getting last team health",
                    error: err
                });
            }
            if(_.isEmpty(lastTeamHealth)) {
                return res.status(200).json({
                    message: 'There are no healths.'
                });
            }
            res.status(200).json({
                message: 'Last team health received',
                obj: lastTeamHealth[0].teamHealth
            });
        })
});

//Get all team values for question one
router.post('/teamhealths', function(req, res, next) {

    TeamHealth.find()
        .exec(function(err, allTeamHealths) {
            if(err) {
                return res.status(500).json({
                    title: "Error occured on getting on team health values for question one",
                    error: err
                })
            }
            //Checking if empty again - need to use Lodash to better check
            //TODO add lodash check here
            if(allTeamHealths[0] == undefined) {
                return res.status(200).json({
                    message: 'There are no team healths!',
                    obj: []
                });
            } 
            res.status(200).json({
                message: 'Here are all the last team healths',
                obj: allTeamHealths
            })
        })
})

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred on post',
                error: err
            });
        }
        var health = new Health({
            currentHealth: req.body.currentHealth,
            user: user
        });

        health.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on save posting health',
                    error: err
                });
            }
            user.healths.push(result);
            user.save();

            res.status(201).json({
                message: 'Saved health',
                obj: result
            });
        });
    });
});

module.exports = router;