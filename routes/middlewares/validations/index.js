const { validationResult } = require('express-validator');
const { errorResponseMsg } = require('../../../utilities/response');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return errorResponseMsg(res, 422, 'Validation Error', errors.errors);
};