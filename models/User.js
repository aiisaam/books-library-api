const mongoose = require('mongoose');


const userShema = mongoose.Schema({
    userName: { 
        type: String,
        required: true
    },
    email: {
         type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    }
});


module.exports = mongoose.model('User', userShema); 