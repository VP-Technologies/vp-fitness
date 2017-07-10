// This file contains most (if not all) of the actual api endpoints for data
// access and manipulation (i.e. user creation, team get, etc...)
//
// Written by Aaron Vontell (vontell)
// Version 1.0.0 (July 9, 2017)

// MODULE DEPS ----------------------------------------------------------------
// Incorporate all of our modules needed to run this thing
//      ./constants - ports, naming, urls, logos, etc... Found in constants.js
//      express - the actual web framework
//      ./vpdb - code to access the db using pg-promise

const c       = require('./constants')
const express = require('express')
const db      = require('./vpdb');

// OPEN ENDPOINTS ------------------------------------------------------------------

var router = express.Router();

// User routes
router.get('/users', db.getAllUsers);
router.post('/users', db.createUser);

module.exports = router;
