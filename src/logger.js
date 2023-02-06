/**
 * File Description : This logger file is to create a results.log file to accumlate all the 
 * logs from the application in a single file for debugging.
 * Author : Suma K
 */
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');


/// Create the log directory if it does not exist
const logDir = __dirname + '/../' + 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

/**
 * 
 * @param {*} filename | File name to print in the log file to determine where the log is coming from
 * @returns <timestamp> <filepath> <log type> <log>
 */

/// Create the log directory if it does not exist

function getapiname(apiname) {
    const logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.label({ label: apiname }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
        ),
        transports: [
            new transports.Console({
                handleExceptions: true,
                format: format.combine(
                    format.colorize(),
                    format.printf(
                        (info) =>
                            `${info.timestamp} ${info.level} [${info.label
                            }]: ${JSON.stringify(info.message)}`
                    )
                )
            }),
            new transports.File({
                filename,
                handleExceptions: true,
                format: format.combine(
                    format.printf(
                        (info) =>
                            `${info.timestamp} ${info.level} [${info.label
                            }]: ${JSON.stringify(info.message)}`
                    )
                )
            })
        ],
        exitOnError: false
    });
    return logger;
}

module.exports = getapiname;
