const express = require('express')
const mongodb = require('mongodb')

module.exports = (app) => {
    app.post('/register', (req, res) => {
        res.send({
            message: `Hello ${req.body.email}`
        })
    })
}

// For registering purposes

// Post the items

// Delete the items

// Update the items
