const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Middleware
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
    extended: false
}))

//Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

//Passport Middleware
// app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// Bring in passport strategy
require('./config/passport')(passport);

// Port to listen on
app.listen(process.env.PORT || 3000)

const users = require('./routes/api/users');
app.use('/api/users', users);

// Bring in DB config
// Setting up mongo
const db = require('./config/keys').mongoURI;;
mongoose.Promise = global.Promise;
mongoose.connect(db, 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true }
).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with db ${err}`)
});
