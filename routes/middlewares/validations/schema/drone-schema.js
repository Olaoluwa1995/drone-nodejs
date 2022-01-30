const { body } = require('express-validator');

module.exports = {
    droneSchema: () => [
        body('serialNumber')
            .isString()
            .isLength({ max: 100 })
            .notEmpty(),
        body('model')
            .isString()
            .isIn(['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'])
            .notEmpty(),
        body('weight')
            .isInt({ max: 500 })
            .notEmpty(),
        body('batteryCapacity')
            .isInt({ max: 100 })
            .notEmpty(),
        body('state')
            .isString()
            .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
            .notEmpty(),
    ]
}