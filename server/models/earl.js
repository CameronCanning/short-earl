const mongoose = require('mongoose');

const EarlSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        required: true
    },
});

EarlSchema.post('save', (doc) => {
    console.log('saved');
});

module.exports = mongoose.model('Earl', EarlSchema, 'earls');