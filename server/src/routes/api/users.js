const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
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

/** 
* @route POST api/route/login
* @desc Login the user
* @access Public
*/

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Useranme is not found",
                success: false
            });
        }
        // If user found, then check pw
        bcrypt.compare(req.body.password, user.password).then(isMatching => {
            if (isMatching) {
                // User pw is correct
                const payload = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
                // We need to sign off the jwt
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in'
                    })
                });
            } else {
                return res.status(404).json({
                    msg: "Password is wrong",
                    success: false
                });
            }
        })
    })
});


/**
 * @route POST api/users/profile
 * @desc Return the User's data
 * @acces Private
 */
router.get('/profile', passport.authenticate('jwt', { 
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});

module.exports = router;
