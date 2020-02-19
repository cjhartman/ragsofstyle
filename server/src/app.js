const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes/routes')(app)

// Port to listen on
app.listen(process.env.PORT || 3000)

// // Setting up mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@domain.com:27017/ragsofstyle', 
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
