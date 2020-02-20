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

// app.get('/', (req, res) => {
//     return res.send("<h1>Hello world</h1>");
// });

// Bring in DB config
// Setting up mongo
const db = require('./config/keys').mongoURI;;
mongoose.Promise = global.Promise;
mongoose.connect(db, 
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with db ${err}`)
});
