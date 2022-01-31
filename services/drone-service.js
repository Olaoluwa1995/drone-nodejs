const { v4 } = require('uuid');
const DroneRepository = require('../repositories/drone-repository');
const { serviceResponse } = require('../utilities/response');
const { uploadImage } = require('../utilities/upload');

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
        } catch (err) {
            console.log(err);
        }
    }

    static async sum(array, key) {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
    }

    static async loadDrone (medToLoad, files, droneId) {
        try {
            const { weight } = medToLoad;
            if(files === undefined) return serviceResponse(422, 'Load Item image is required');
            const drone = await DroneRepository.findDroneById(droneId);
            if(!drone) return serviceResponse(404, 'Invalid drone id');

            const loadedItem = await DroneRepository.findDroneMed(droneId);
            const alreadyLoadedWeight = this.sum(loadedItem, 'weight');
            const currentLoadWeight = alreadyLoadedWeight + weight;
            if(currentLoadWeight > drone.weight) 
                return serviceResponse(409, `Opps! Drone avaible space is ${drone.weight - alreadyLoadedWeight}gr`);

            const image = await uploadImage(files.image);
            
            const loadMed = await DroneRepository.createMed({...medToLoad, image});
            return serviceResponse(201, 'Successfully loaded drone with medication', loadMed);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DroneService;