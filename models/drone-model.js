const mongoose = require('mongoose');

const DroneSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        maxlength: 100,
        required: true,
    },
    model: {
        type: String,
        enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'],
        required: true,
    },
    weightLimit: {
        type: Number, 
        max: 500,
        required: true,
    },
    batteryCapacity: {
        type: Number,
        max: 100,
        required: true,
    },
    state: {
        type: String,
        enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
        required: true,
    }
});

const Drone = mongoose.model('Drone', DroneSchema);

module.exports = Drone;