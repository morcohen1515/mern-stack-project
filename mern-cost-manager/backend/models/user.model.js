const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    bday: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    maritalstatus: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
 }, {
        timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;