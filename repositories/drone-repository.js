const { Drone } = require("../models");

class DroneRepository {
    static async create (newDrone) {
        const drone = await Drone.create(newDrone);
        return drone;
    }

    static async findBySerialNumber (serialNumber) {
        const drone = await Drone.findOne({serialNumber});
        return drone;
    }
}

module.exports = DroneRepository;