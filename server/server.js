var mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 5000;
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(require('./routes'));


mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Successfully connected to MongoDB.'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("/*", (req, res) => {
        console.log(path.join(__dirname, "../client/build", "index.html"));
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
      });
}


app.listen(port, () => {
    console.log('Server is running on Port: ' + port);
});