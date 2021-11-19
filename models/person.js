const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    idCard: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = model('Person', PersonSchema);