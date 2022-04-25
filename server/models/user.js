const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

});
UserSchema.virtual('earls', {
    ref: 'Earl',
    localField: '_id',
    foreignField: 'user_id'
})

UserSchema.pre('save', function (callback) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            return callback();
        })
    }
    else {
        return callback();
    }
})
module.exports = mongoose.model('User', UserSchema, 'users');

