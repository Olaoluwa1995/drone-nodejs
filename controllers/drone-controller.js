const logger = require("../config/logger");
const DroneService = require("../services/drone-service");
const { errorResponseMsg, successResponseMsg } = require("../utilities/response");

module.exports = {
    register: async (req, res) => {
        try {
            const {body} = req;
            const { status, message, data } = await DroneService.create(body);
            if (status >= 400) return errorResponseMsg(res, status, message)
            return successResponseMsg(res, status, message, data);
        } catch (error) {
            logger.error(error);
        }
    },

    loadDrone: async (req, res) => {
        try {
            const { body, files, params } = req;
            const { status, message, data } = await DroneService.loadDrone(body, files, params.droneId);
            if(status >= 400) return errorResponseMsg(res, status, message);
            return successResponseMsg(res, status, message, data);
        } catch (error) {
            logger.error(error);
        }
    },

    getDroneMedItem: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await DroneService.getLoadedDroneItems(params.droneId);
            if(status >= 400) return errorResponseMsg(res, status, message);
            return successResponseMsg(res, status, message, data);
        } catch (error) {
            logger.error(error);
        }
    },

    getDroneBatteryLevel: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await DroneService.getDroneBatteryLevel(params.droneId);
            if(status >= 400) return errorResponseMsg(res, status, message);
            return successResponseMsg(res, status, message, data);
        } catch (error) {
            logger.error(error);
        }
    },

    getAvailableDrones: async (req, res) => {
        try {
            const { status, message, data } = await DroneService.getAvailableDrones();
            if(status >= 400) return errorResponseMsg(res, status, message);
            return successResponseMsg(res, status, message, data); 
        } catch (error) {
            logger.error(error);
        }
    },
}