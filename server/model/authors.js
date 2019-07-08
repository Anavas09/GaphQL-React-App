const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
    name: { type: String, require: true},
    age: {type: Number, require: true}
})

module.exports = mongoose.model('Author', AuthorSchema);