var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

//Get admin status of logged in user
router.get('/', function (req, res, next) {

    if(req.query.id) {
        User.find(ObjectId(req.query.id.toString()), {admin: 1})
            .exec(function (err, admin) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred on getting user',
                        error: err
                    });
                }

                res.status(200).json({
                    message: 'Success',
                    obj: admin[0].admin
                });
            })
    } else {
         res.status(200).json({
         message: 'Success',
         obj: false
      });
    }
});

//Get all users that exist for admin to see
router.get('/users', function(req, res, next) {

    User.find()
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred on getting list of users',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: users
            });
        })
})

module.exports = router;