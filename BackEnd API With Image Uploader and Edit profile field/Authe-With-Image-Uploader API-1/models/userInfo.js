const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
        description: "can only be one of the enum values and is required"
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    hobby:{
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    zip:{
        type:Number,
    }

});


module.exports = mongoose.model('userinfo', userInfo);