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
    clicks: {
        type: Number, 
        default: 0
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Earl', EarlSchema, 'earls');