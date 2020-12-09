const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    login: {type: String, required: true},
    workPhone: {type: Number, unique: true},
    personalPhone: {type: Number, required: true, unique: true},
    workEmail: {type: String, unique: true},
    personalEmail: {type: String, required: true, unique: true},
    businessLocation: {
        _id: {type: Types.ObjectId, required: true},
        title: {type: String, required: true}
    },
    company: {
        _id: {type: Types.ObjectId,required: true},
        title: {type: String, required: true}
    },
    role: {
        _id: {type: Types.ObjectId, required: true},
        title: {type: String, required: true}
    },
    hourlyRate: {type: Number, required: true},
}, {
    timestamps: true
});

module.exports = model('Employee', schema);
