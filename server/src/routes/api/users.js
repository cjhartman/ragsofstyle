const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/Users');

/** 
* @route POST api/route/register
* @desc Register the user
* @access Public
*/

router.post('/register', (req, res) => {
    let { 
        name, 
        username, 
        email, 
        password, 
        confirm_password 
    } = req.body
    // Check passwords match
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Your passwords don't match"
        });
    }

    // Check for a unique email
    User.findOne({username: username}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken"
            });
        }
    });

    User.findOne({email: email}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already in use, contact system admin or maybe try a different password"
            });
        }
    })

    //The data is valid 
    //Register the user
    let newUser = new User({
        name,
        username,
        password,
        email
    });

    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User has been registered"
                })
            })
        })
    })
});

module.exports = router;