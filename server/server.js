var mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const path = require("path");
const MongoStore = require('connect-mongo');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;

app.use(cors(
    {
        origin: process.env.ENDPOINT || "http://localhost:5000",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
        credentials: true
    }
));

app.use(session({
    key: 'user_sid',
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    unset: 'destroy',
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    store: MongoStore.create({mongoUrl: process.env.ATLAS_URI})
}))
app.use(express.json());

if (process.env.NODE_ENV === 'development'){
    app.use(require('./middleware/logger'));
}
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use(require('./routes'));
app.get('/*', (req,res) => {res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))});

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Successfully connected to MongoDB.'));

app.listen(port, () => {
    console.log('Server is running on Port: ' + port);
});