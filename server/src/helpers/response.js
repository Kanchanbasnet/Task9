/**
 * Response with the data and appropriate status code.
 * @params {Object} res - The response object that is sent to the client.
 * @params {Number} statuscode - A code sent to the client in response to an HTTP request. 
 * @params {Boolean} success- Indicates whether the request is successful or not.
 * @params {String} message - A message sent to the user. 
 * @params {Object} data - The data object that is sent to the client.
 */




const apiresponse = (res, statuscode, success, message, data) => {
    const responseData = {
      success: success,
      message: message,
      data: data,
    };
    return res.status(statuscode).json(responseData);
  };

  module.exports = apiresponse;