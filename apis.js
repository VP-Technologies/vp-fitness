// This file contains the protected api endpoints for the VP fitness app
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

// User routes
router.get('/users', db.getThisUser);
router.patch('/users', db.updateThisUser);

// User info routes (authenticated - users can only update their own info)
router.get('/users/info', db.getUserInfo);
router.post('/users/info', db.createUserInfo);
router.patch('/users/info', db.updateUserInfo);

module.exports = router;
