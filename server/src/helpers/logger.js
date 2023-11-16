const winston = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');
require('dotenv').config();


const consoleformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
);

const logformat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({stack: true})
);

const logger = winston.createLogger({
    level: 'info',
    transports: []
});
  if(process.env.NODE_ENV === 'production'){
    logger.add(new dailyRotateFile({
        dirname: "logs",
        filename:"node%DATE%.log",
        datePattern:'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize:'20m',
        maxFiles:'14d',
        format: logformat,
        level:'info'

    }));
 } else{
        logger.add(new winston.transports.Console({
            format: consoleformat,
            level: 'info'
        }));
    }
module.exports = logger;
  