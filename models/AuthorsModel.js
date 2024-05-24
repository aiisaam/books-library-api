const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('Author', AuthorSchema);


