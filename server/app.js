const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const port = 3000;
 
app.get("/register", (req, res) => {
 res.send({
     message: `You have been registered with ${req.body.email}`
 });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@domain.com:27017/ragsofstyle', 
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
