const { body, param } = require('express-validator');

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
            .withMessage('weight must be an integer within 500')
            .notEmpty(),
        body('batteryCapacity')
            .isInt({ max: 100 })
            .withMessage('batteryCapacity must be an integer within 100')
            .notEmpty(),
        body('state')
            .isString()
            .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
            .notEmpty(),
    ],

    medSchema: () => [
        param('droneId')
            .isUUID()
            .withMessage('droneId must be a valid UUID')
            .notEmpty(),
        body('name')
            .isString()
            .matches(/^[A-Za-z0-9_-]*$/)
            .withMessage('name can only contain letters, numbers, -, _')
            .notEmpty(),
        body('weight')
            .isInt()
            .withMessage('weight must be an integer')
            .notEmpty(),
        body('code')
            .isString()
            .matches(/^[A-Z0-9_]*$/)
            .withMessage('code can only upper case letters, underscore and numbers')
            .notEmpty()
    ]
}