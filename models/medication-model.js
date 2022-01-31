const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    droneId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        validate: /^[A-Za-z0-9_-]*$/,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        validate: /^[A-Z0-9_]*$/,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Medication = mongoose.model('Medication', MedicationSchema);

module.exports = Medication;