const { droneSchema } = require('./middlewares/validations/schema/drone-schema');
const validate = require('./middlewares/validations');
const { register } = require('../controllers/drone-controller');

const router = require('express').Router();

router.post('/register', droneSchema(), validate, register);

module.exports = router;