var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Health = require('../../health/question-one/healthModel');
var UserQuestionTwoValue = require('../../health/question-two/userQuestionTwoModel');
var Message = require('../../messages/models/message');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: false,
        healths: [],
        messages: [],
        questionTwoValues: []
    });

    //Pushing a default question one value at the start
    var health = new Health({
        currentHealth: 50,
        user: user
    });
    user.healths.push(health);
    health.save();

    //Pushing a default question two value at the start
    var userQuestionTwoValue = new UserQuestionTwoValue({
        userQuestionTwoValue: 50,
        user: user
    });
    user.questionTwoValues.push(userQuestionTwoValue);
    userQuestionTwoValue.save();

    var message = new Message({
        content: 'First!',
        user: user
    });

    message.save();
    user.messages.push(message);

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred on getting user',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred on getting user',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

router.post('/delete', function (req, res, next) {

    User.findById(req.body.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured finding this user',
                error: err
            });
        }

        //TODO have to also remove all their healths and messages, or else the app will fail on load and it can't find a user for it (specifically messages)
        //commented out for now to do for later as it's not important
        res.status(200).json({
            message: 'Delete user',
            obj: result
        });

        // user.remove(function(err, result) {
        //     if(err) {
        //         return res.status(500).json({
        //             title: 'An error occured removing this user',
        //             error: err
        //         });
        //     }

        //     res.status(200).json({
        //         message: 'Delete user',
        //         obj: result
        //     });
        // })
    })

})

module.exports = router;
