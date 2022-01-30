const DroneService = require("../services/drone-service");
const { errorResponseMsg, successResponseMsg } = require("../utilities/response");

module.exports = {
    register: async (req, res) => {
        try {
            const {body} = req;
            const { status, message, data } = await DroneService.create(body);
            if (status > 400) return errorResponseMsg(res, status, message)
            return successResponseMsg(res, status, message, data);
        } catch (error) {
            console.log(error);
        }
    }
}