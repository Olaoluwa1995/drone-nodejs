const { v4 } = require('uuid');
const DroneRepository = require('../repositories/drone-respository');
const { serviceResponse } = require('../utilities/response');

class DroneService {
    static async create (droneToCreate) {
        try {
            const droneExist = await DroneRepository.findBySerialNumber(droneToCreate.serialNumber);
            if (droneExist) return serviceResponse(409, 'Drone already exist');
            const droneId = v4();
            const newDrone = {
                ...droneToCreate, droneId
            };
            const createdDrone = await DroneRepository.create(newDrone);
            return serviceResponse(201, 'Successfully created drone', createdDrone);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DroneService;