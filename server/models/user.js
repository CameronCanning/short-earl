const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    earls: {
        type: Array
    }
});

mongoose.model('User', UserSchema);