const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    login: {type: String, required: true},
    workPhone: {type: String, required: true},
    personalPhone: {type: String, required: true},
    workEmail: {type: String, required: true},
    personalEmail: {type: String, required: true},
    businessLocation: {
        title: {type: String, required: true}
    },
    company: {
        title: {type: String, required: true}
    },
    role: {
        title: {type: String, required: true}
    },
    hourlyRate: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = model('Employee', schema);
