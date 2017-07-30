// This file contains the unprotected api endpoints for the VP fitness app
//
// Written by Aaron Vontell (vontell)
// Version 0.0.1 (July 26, 2017)

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
var app = module.exports.app;

// User creation routes
router.get('/users', db.getAllUsers);
router.post('/users', db.createUser);

module.exports = router;
