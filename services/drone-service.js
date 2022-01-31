const { v4 } = require('uuid');
const logger = require('../config/logger');
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
        } catch (error) {
            logger.error(error);
        }
    }

    static async sum(array, key) {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
    }

    static async loadDrone (medToLoad, files, droneId) {
        try {
            const { weight } = medToLoad;
            if(files === undefined) return serviceResponse(422, 'Load Item image is required');
            const drone = await DroneRepository.findById(droneId);
            if(!drone) return serviceResponse(404, 'Invalid drone id');

            const loadedItem = await DroneRepository.findDroneMed(droneId);
            const alreadyLoadedWeight = await this.sum(loadedItem, 'weight');
            const currentLoadWeight = alreadyLoadedWeight + parseInt(weight);
            if(drone.batteryCapacity < 25) return serviceResponse(400, 'Drone Battery is below 25%');
            if(currentLoadWeight > drone.weight) 
                return serviceResponse(409, `Opps! Drone avaible space is ${drone.weight - alreadyLoadedWeight}gr`);
            if(currentLoadWeight === drone.weight)  {
                await drone.updateOne({ state: 'LOADED' });
            } else {
                await drone.updateOne({state: 'LOADING'});
            }
            const image = await uploadImage(files.image);
            
            const loadMed = await DroneRepository.createMed({...medToLoad, image, droneId});
            return serviceResponse(201, 'Successfully loaded drone with medication', loadMed);
        } catch (error) {
            logger.info(error);
        }
    }

    static async getLoadedDroneItems (droneId) {
        try {
            const droneExist = await DroneRepository.findById(droneId);
            if(!droneExist) return serviceResponse(404, 'Drone not found');

            const loadedItems = await DroneRepository.findDroneMed(droneId);
            return serviceResponse(200, 'Successfully feched drone medications', loadedItems);
        } catch (error) {
            logger.error(error);
        }
    }

    static async getDroneBatteryLevel (droneId) {
        try {
            const droneExist = await DroneRepository.findById(droneId);
            if(!droneExist) return serviceResponse(404, 'Drone not found');
            const batteryLevel = {
                batteryCapacity: droneExist.batteryCapacity,
            }
            return serviceResponse(200, 'Successfully feched drone battery', batteryLevel);
        } catch (error) {
            logger.error(error);
        }
    }

    static async getAvailableDrones () {
        try {
            const availableDrones = await DroneRepository.findAvailableDrones();
            return serviceResponse(200, 'Succcessfully fetched available drones', availableDrones);
        } catch (error) {
            logger.error(error);
        }
    }

    static async logBatteryLevel () {
        try {
            const drones = await DroneRepository.findAll();
            drones.forEach((drone) => {
                logger.info(`${drone.serialNumber} battery level is currently ${drone.batteryCapacity}`);
            })
            return;
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = DroneService;