const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const spotify = require('./routes/api/spotify');
var cors = require('cors');
var cookieParser = require('cookie-parser');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDb Connected'))
    .catch( err => console.log(err));

//Passport Middleware
app.use(passport.initialize()).use(cors()).use(cookieParser());

//Passport Config
require('./config/passport')(passport);

//use routes, this is how the the files in api know that they're pointing to /api/x
app.use('/api/users', users);
app.use('/api/spotify', spotify);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
