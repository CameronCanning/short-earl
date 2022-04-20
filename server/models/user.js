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
    earls: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

UserSchema.pre('save', function (callback) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            console.log('hashed: '+ hash);
            return callback();
        })
    }
    else {
        return callback();
    }
})
module.exports = mongoose.model('User', UserSchema, 'users');