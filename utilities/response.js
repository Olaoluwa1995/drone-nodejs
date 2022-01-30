module.exports = {
    errorResponseMsg: (res, status, message, data) => res.status(status).json({
      status: 'error',
      message,
      data
    }),
  
    successResponseMsg: (res, status = 200, message, data) => res.status(status).json({
      status: 'success',
      message,
      data
    }),
    serviceResponse: (status, message, data) => ({ status, message, data }),
  };