const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    id: {type: Types.ObjectId},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    login: {type: String, required: true},
    workPhone: {type: Number, required: true},
    personalPhone: {type: Number, required: true},
    workEmail: {type: String, required: true, unique: true},
    personalEmail: {type: String, required: true, unique: true},
    businessLocation: {type: String, required: true},
    company: {type: String, required: true},
    role: {type: String, required: true},
    hourlyRate: {type: Number, required: true},
});

module.exports = model('Employee', schema);
