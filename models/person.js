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
    },
    production : [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
});

PersonSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Person', PersonSchema);