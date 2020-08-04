const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
const passport = require('passport');
const User = require('../../models/Users');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const async = require('async');

const maxLoginAttempts = 5;
const maxEmailAttempts = 5;

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
    User.findOne({ username: username }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken"
            });
        }
    });

    User.findOne({ email: email }).then(user => {
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
                msg: "Username is not found",
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
                    expiresIn: 7200000
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
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
 * @route POST api/route/reset-password
 * @desc Reset users PW
 * @access Public
 */

router.post('/forgot-password', (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(401)
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rosdevsupp@gmail.com',
                    pass: 'Tr0p9v$R@gS'
                }
            });
            let mailOptions = {
                to: user.email,
                from: 'rosdevsupp@gmail.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:8080' + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.status(200).json({
            msg: 'Found user',
            success: true
        })
    });
})

router.get('/reset/:token', (req, res) => {
    console.log('were here')
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            return res.status(404).json({
                msg: 'Not a proper email',
                success: false
            });
        }
        return res.status(200).json({
            msg: 'successfully got the reset page',
            success: true
        });
    });
});

/**
 * @route GET api/users/profile
 * @desc Return the User's data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});

module.exports = router;
