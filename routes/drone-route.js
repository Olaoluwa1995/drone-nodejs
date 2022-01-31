const { droneSchema, medSchema, droneIdSchema } = require('./middlewares/validations/schema/drone-schema');
const validate = require('./middlewares/validations');
const { register, loadDrone, getDroneMedItem, getAvailableDrones, getDroneBatteryLevel } = require('../controllers/drone-controller');

const router = require('express').Router();

router.post('/', droneSchema(), validate, register);
router.get('/', getAvailableDrones);
router.get('/:droneId/battery', getDroneBatteryLevel);
router.get('/:droneId/med', droneIdSchema(), validate, getDroneMedItem);
router.post('/:droneId/load', medSchema(), validate, loadDrone);

module.exports = router;