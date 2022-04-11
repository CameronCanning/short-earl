const mongoose = require('mongoose');

const EarlSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    url: {
        type: String,
        required: true
    },
});

mongoose.model('Earl', EarlSchema);