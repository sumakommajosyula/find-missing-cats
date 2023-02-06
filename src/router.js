/**
 * File Description : This router file consists of the API to find missing cats 
 * Author : Suma K
 */

const express = require('express');
const router = express.Router();

const { requestValidator, directionValidator } = require('./validator');
const { getDirections } = require('./forensic-services');
let { findMissingCats } = require('./controller');

//API: To locate missing cats
router.post('/locateMissingCats',
    requestValidator(),
    (req, res, next) => getDirections(req, res, next),
    (req, res, next) => directionValidator(req, res, next),
    (req, res) => findMissingCats(req, res)
)

module.exports = router;