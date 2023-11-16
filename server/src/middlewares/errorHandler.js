const response = require('../helpers/response');
const httpstatus = require('http-status');
const logger = require('../helpers/logger');
const moment = require('moment-timezone');

const errorHandler = (error, req, res, next) => {
  /**
   * Respond with the data and appropriate status code.
   * @param {Object} res - The response object that is sent to the client.
   * @param {Number} statuscode - A code sent to the client in response to an HTTP request.
   * @param {Boolean} success - Indicates whether the request is successful or not.
   * @param {String} message - A message sent to the user.
   * @param {Object} data - The data object that is sent to the client.
   */

  const timestamp = moment().tz("Asia/Kathmandu").format('dddd, MM/DD/YYYY, hh:mm:ss a');
  const statuscode = error.status || httpstatus.INTERNAL_SERVER_ERROR;
  const errorMessage = error.message || "Error: Something has occurred.";

  logger.error(`| Date: ${timestamp} | Request Terminated | ${req.method} | ${req.originalUrl} | Req body: ${JSON.stringify(req.body)} | Params: ${JSON.stringify(req.params)} | Response : ${statuscode}`);
  next(error);
  return response(res, statuscode, false, errorMessage, null);
};

module.exports = errorHandler;
