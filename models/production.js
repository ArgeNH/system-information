const { Schema, model } = require('mongoose');

const ProductionSchema = new Schema({
    weight: {
        type: String,
        require: true
    }, 
    date: {
        type: date,
        require: true
    }
});