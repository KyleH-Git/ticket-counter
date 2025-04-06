const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    charname: {
        type: String,
        required: true,
        unique: true,
    },
    tickets: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;