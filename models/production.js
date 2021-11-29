const { Schema, model } = require('mongoose');

const ProductionSchema = new Schema({
    weight: {
        type: Number,
        require: true
    }, 
    date: {
        type: Date,
        require: true
    },
    payment: {
        type: Number
    }
});

ProductionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Production', ProductionSchema);