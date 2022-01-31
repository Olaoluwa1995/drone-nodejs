const { droneSchema, medSchema } = require('./middlewares/validations/schema/drone-schema');
const validate = require('./middlewares/validations');
const { register, loadDrone } = require('../controllers/drone-controller');

const router = require('express').Router();

router.post('/register', droneSchema(), validate, register);
router.post('/:droneId/load', medSchema(), validate, loadDrone);

module.exports = router;