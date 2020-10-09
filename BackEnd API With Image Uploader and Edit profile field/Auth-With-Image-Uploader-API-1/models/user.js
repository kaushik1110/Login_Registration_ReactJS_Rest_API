const mongoose = require('mongoose');
// const { route } = require('../routes/auth');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 1,
        max:255
    },
    email:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    password:{
        type: String,
        required: true,
        min:3,
        max:1022
    },
    image:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }

});


module.exports = mongoose.model('user', userSchema);