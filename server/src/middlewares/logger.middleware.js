const logger = require('../helpers/logger');
const moment = require('moment-timezone');

const loggermiddleware = (req, res, next) => {
    const timestamp = moment().tz("Asia/Kathmandu").format('dddd, MM/DD/YYYY, hh:mm:ss a');

    logger.info(`| Date: ${timestamp}|Request Initiated | ${req.method} | ${req.originalUrl}| Req.body: ${JSON.stringify(req.body)} | Params: ${JSON.stringify(req.params)} `);
    next();
};

module.exports = loggermiddleware;
