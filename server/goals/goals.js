var express = require('express');
var router = express.Router();

var _ = require('lodash');
var _ = require('lodash/core');

var Goal = require('./goalModel');

//Get all current goals
router.get('/', function (req, res, next) {

    setTimeout(function () {
        Goal.find()
            .exec(function (err, goals) {

                //If there is an error in the GET return a 500
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured on getting the team goals',
                        error: err
                    });
                }

                //If the GET goes through but there are no team goals or the collection doesn't exist
                if (_.isEmpty(goals)) {
                    return res.status(200).json({
                        message: 'There are no team goals.'
                    });
                }

                res.status(200).json({
                    message: 'Success getting team goals.',
                    obj: goals
                });
            });
    }, 200);

});

module.exports = router;