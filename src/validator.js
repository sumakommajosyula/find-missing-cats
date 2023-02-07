/**
 * File Description : This validator file validates the request objects recieved from User 
 * as well the from directions API 
 * Author : Suma K
 */

const Joi = require('@hapi/joi');
const { allowedDirections } = require('./config');
const winstonLogger = require('./logger');

//Instantiate logger
let logger = winstonLogger(__filename);

/**
 * Fn: To validate if its a valid email address received from the user
 * @returns error message in case of failure or calls next()
 */
const requestValidator = () => {

    const requestSchema = Joi.object().keys({
        emailAddress: Joi.string().email().required()
    });

    return (req, res, next) => {

        //validate recieved request body
        const validation = requestSchema.validate(req.body);

        if (validation.error) {

            logger.debug({'Error in request validator': validation.error});
            res.send(validation.error);
        }
        else {
            logger.info('Request validation sucessful');
            //Move ahead with next function call
            next();
        }
    };
};

/**
 * Fn: To validate the list of directions recieved from the Forensics API
 * @returns error if the list contains non-allowed values else calls the next function for execution
 */
const directionValidator = (req, res, next) => {
    const directionsSchema =
        Joi.object({ directions: Joi.array().items(Joi.string().valid(...allowedDirections).required()) });

    let responseObject = {};
    const validation = directionsSchema.validate(req.directionsData);

    if (validation.error) {

        responseObject.status = false;
        responseObject.message = validation.error.message;
        logger.debug({responseObject});
        res.status(400).json(responseObject);
    }
    else {
        logger.info('Direction validation successful');
        next();
    }
};

module.exports = { requestValidator, directionValidator };
