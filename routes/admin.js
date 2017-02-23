var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

//Get admin status of logged in user
router.get('/', function (req, res, next) {

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

});

module.exports = router;