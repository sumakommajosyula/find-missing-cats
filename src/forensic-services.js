/**
 * Calls made to the Forensics APIs 
 * Author : Suma K
 */

const axios = require('axios');
const { baseURL, directionsURL, locationURL } = require('./config');
const winstonLogger = require('./logger');
const logger = winstonLogger(__filename);
/**
 * Fn: Fetches the directions
 * @returns list of directions 
 */
const getDirections = async (req, res, next) => {
    try {
        //let directionsArrayAPIRes = { data: { directions: [] } }
        // directionsArrayAPIRes.data.directions = ['forward', 'right']; 
        // let { data } = directionsArrayAPIRes;
        let { data } = await axios.get(`${baseURL}/${req.body.emailAddress}/${directionsURL}`);

        //Assign directions array to request, to traverse through next()
        req.directionsData = data;
        next();
    } catch (error) {
        logger.debug({ 'Error in directions API': error });
        res.status(500).json({ status: false, message: 'Error in invoking directions API' });
    }
};

/**
 * Fn: Checks if the cats are found at the derived location coordinates 
 * @param {*} email | To verify the user 
 * @param {*} loc | location coordinates
 * @returns success/fail message based on if cats are found
 */
const verifyCordinates = async (email, loc) => {
    try {
        return await axios.get(`${baseURL}/${email}/${locationURL}/${loc.x}/${loc.y}`);
    } catch (error) {
        logger.debug({ 'Error in directions API': error });
    }
};

module.exports = { getDirections, verifyCordinates };