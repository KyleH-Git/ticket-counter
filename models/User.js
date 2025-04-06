const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    characters: [],
    turnCost: {
        type: Number,
        default: 20,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;