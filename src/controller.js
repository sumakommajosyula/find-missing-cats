/**
 * File Description : This controller file is used to find the missing cats. 
 * Author : Suma K
 */
/* eslint-disable no-undef */
const { verifyCordinates } = require('./forensic-services');
const winstonLogger = require('./logger');
const logger = winstonLogger(__filename);

const facings = ['North', 'East', 'South', 'West'];

/**
 * Fn: Changes the direction of the woman at the current location
 * @param {*} currentFacing | Woman's current facing direction (North/South/East/West)
 * @param {*} nextDirection | Woman's change in direction (left/right)
 * @returns { facing } | Woman's facing after the change in direction (North/South/East/West)
 */
const turn = (currentFacing, nextDirection) => ({
    facing: nextDirection === 'left' ?
        currentFacing === 0 ? 3 : currentFacing - 1
        : currentFacing === 3 ? 0 : currentFacing + 1
});

/**
 * Fn: Moves the current location by 1 either on x-axis or y-axis
 * @param {*} loc | current location of the woman
 * @returns next location of the woman
 */
const displace = (loc) => {
    switch (facings[loc.facing]) {
        case 'North': {
            return { y: ++loc.y };
        }
        case 'East': {
            return { x: ++loc.x };
        }
        case 'South': {
            return { y: --loc.y };
        }
        case 'West': {
            return { x: --loc.x };
        }
    }
};

/**
 * Fn: Changes the facing or moves based on the next direction from the forensics API 
 * @param {*} currLoc | Woman's current location
 * @param {*} nextDir | Next direction as received from the Forensics API
 * @returns Updated values of facing, x & y coordinates
 */
const turnOrDisplace = (currLoc, nextDir) => {
    return nextDir === 'forward' ?
        { ...currLoc, ...displace(currLoc) }
        : { ...currLoc, ...turn(currLoc.facing, nextDir) };
};

/**
 * Fn: Locates the coordinates of missing cats
 * @param {*} req | Consists of email address & directions set as received from Forensics API
 * @param {*} res | Findings
 */
const findMissingCats = (async (req, res) => {
    const { emailAddress } = req.body;
    const { directionsData: { directions } } = req;

    logger.info({ 'Directions in request': directions });

    if (directions.includes('forward')) {
        const initialLoc = { facing: 0, x: 0, y: 0 };
        const missingCats = directions.reduce(
            (updatedLoc, nextDir) => turnOrDisplace(updatedLoc, nextDir),
            initialLoc
        );

        logger.info({ 'Current locationCordinates of missing cats': missingCats });

        //Check if the cats are found at the derived location coordinates
        let missingCatsLocation = await verifyCordinates(emailAddress, missingCats);

        logger.info('Find missing cats API executed sucessfully');
        res.status(200).json({
            status: true,
            locationCordinates: {
                x: missingCats.x,
                y: missingCats.y,
            },
            'message': missingCatsLocation.data.message
        });
    } else {
        logger.info(`No 'forward' direction found in directions API response`);
        res.status(200).json({
            status: true,
            locationCordinates: {
                x: missingCats.x,
                y: missingCats.y,
            },
            message: 'Cats are right behind you!'
        });
    }
});

module.exports = { findMissingCats, turnOrDisplace, displace, turn };