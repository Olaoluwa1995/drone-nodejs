const router = require('express').Router();
const { errorResponseMsg } = require('../utilities/response');
const droneRoute = require('./drone-route');

router.use('/drone', droneRoute);
router.use('*', (req, res) => errorResponseMsg(res, 404, 'Not Found'));

module.exports = router;