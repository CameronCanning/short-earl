var mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth');
app.use(cors());
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;

app.use(session({
    key: 'user_sid',
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    store: MongoStore.create({mongoUrl: process.env.ATLAS_URI})
}))
app.use(express.json());
//app.use(auth);

if (process.env.NODE_ENV === 'development'){
    app.use(require('./middleware/logger'));
}

app.use(require('./routes'));




mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Successfully connected to MongoDB.'));

app.listen(port, () => {
    console.log('Server is running on Port: ' + port);
});