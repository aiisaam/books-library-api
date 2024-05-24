const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'        
    },
    img: {
        type: String,
        required: true
    }, 
    description: {
           type: String,
           required:true
    },
    prix: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Book', BookSchema);