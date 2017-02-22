var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Health = require('../models/health');

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

    //Grab all distinct users from MongoDB
    User.distinct("_id")
        .exec(function (err, userIds) {

            //Temporary top level array to stock health values
            var array = [];

            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting unique user ids in team GET',
                    error: err
                });
            }

            //Loop through each distinct user in the health collection
            for (let i = 0; i < userIds.length; i++) {
                Health.find({ user: userIds[i] })
                    .limit(1)
                    .sort({ $natural: -1 })
                    .exec(function (err, health) {

                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred in looping through most recent health of unique users in health collection',
                                error: err
                            });
                        }

                        //if they have a health property you push it onto the array
                        if (health[0]) {
                            array.push(health[0]['currentHealth']);
                        }

                        //If you are at the last iteration you send the response with the average
                        if (i == userIds.length - 1) {
                            var sum = array.reduce(function (acc, val) {
                                return acc + val;
                            })

                            var average = sum / userIds.length;

                            res.status(201).json({
                                message: 'Saved message',
                                obj: average
                            });

                        }
                    })
            }
        })

    // User.find()
    //     .populate('healths')
    //     .exec(function (err, users) {
    //         if (err) {
    //             return res.status(500).json({
    //                 title: 'An error occurred on getting user',
    //                 error: err
    //             });
    //         }

    //         let sum = 0;
    //         let average = 0;
    //         for(let i = 0; i < users.length; i++) {
    //             for(let j = 0; j < users[i].healths.length; j++) {
    //                 if(j === users[i].healths.length - 1) {
    //                     sum += users[i].healths[j].currentHealth;
    //                 }
    //             }
    //         }
    //         console.log("Moyenne : " + parseInt(sum / users.length));
    //         average = parseInt(sum / users.length);

    //         res.status(200).json({
    //             message: 'Success',
    //             obj: average
    //         });
    //     });

    // User.aggregate(
    //     [
    //         {
    //             "$match": {
    //                 "to": req.user
    //             }
    //         }
    //     ], function(err, healths) {
    //         if (err) {
    //             return res.status(500).json({
    //                 title: 'An error occurred on getting user',
    //                 error: err
    //             });
    //         }

    //         //TO DO grab the healths array and get average

    //         res.status(200).json({
    //             message: 'Success',
    //             obj: healths
    //         });
    //     }
    // );

});

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
                message: 'Saved message',
                obj: result
            });
        });
    });
});

module.exports = router;