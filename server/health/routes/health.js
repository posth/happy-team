var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../../user/models/user');
var Health = require('../models/health');

var healthEventEmitter = require('../events/healthEvents');

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
            res.status(200).json({
                message: 'Success',
                obj: healths
            });
        });
});

//Get latest health values
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
            res.status(200).json({
                message: 'Success',
                obj: health[0]
            });
        })
});

//Get latest team health values
router.get('/team', function (req, res, next) {

    // let average = healthController.getAverage();

    // console.log('-------------module return', average);

    // if (average == null) {
    //     User.find()
    //         .populate('healths')
    //         .exec(function (err, users) {

    //             if (err) {
    //                 return res.status(500).json({
    //                     title: 'An error occurred on getting unique user ids in team GET',
    //                     error: err
    //                 });
    //             }

    //             let sum = 0;
    //             let totalUsers = users.length;

    //             users.forEach(function (user) {
    //                 let lastHealthObject = user['healths'].pop();
    //                 let mostRecentHealth = lastHealthObject['currentHealth'];
    //                 sum += mostRecentHealth;
    //             })

    //             let average = sum / totalUsers;

    //             res.status(201).json({
    //                 message: 'Saved message',
    //                 obj: average
    //             });
    //         })
    // }

    // res.status(201).json({
    //     message: 'Saved message',
    //     obj: average
    // });

});

var healthController = require("../controllers/healthController.js");

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

            healthEventEmitter.emit('healthPostComplete');

            res.status(201).json({
                message: 'Saved health',
                obj: result
            });
        });
    });
});

module.exports = router;