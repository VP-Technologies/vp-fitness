// Welcome to the entrance point of the VP Fitness Backend!
//
// Written by Aaron Vontell (vontell)
// Version 0.0.1 (July 9, 2017)

// MODULE DEPS ----------------------------------------------------------------
// Incorporate all of our modules needed to run this thing
//      ./constants - ports, naming, urls, logos, etc... Found in constants.js
//      express - the actual web framework
//      ./util/vplog - used for web logging
//      ./api - endpoints for data manipulation
//      ./apis - endpoints for data manipulation (protected)
//      body-parser - used for body parsing...
//      oauth2-server - authentication server implementation using OAuth 2.0
//      ./vpdb - database methods

const c           = require('./constants')
const express     = require('express')
const vplog       = require('./util/vplog')
const api         = require('./api')
const apis        = require('./apis')
const bodyParser  = require('body-parser')
const oauthServer = require('oauth2-server');
const db          = require('./vpdb');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// serve the html content
app.use(express.static('public'))

// AUTH HANDLING --------------------------------------------------------------

// Add OAuth server.
app.oauth = oauthServer({
    model: require('./auth'),
    grants: ['password'],
    debug: true
});

// Post token.
app.post('/oauth/token', app.oauth.grant());

// Get secret.
app.get('/oauth/validate', app.oauth.authorise(), function(req, res) {
  // Will require a valid access_token.
  res.send({authorized: true});
});

// BASIC ROUTING --------------------------------------------------------------

// Use the api's!
app.use("/api", api);

// The endpoints in "apis" requires authentication
app.use("/apis", app.oauth.authorise(), apis);

// Some error handling
app.use(app.oauth.errorHandler());
app.use(function(err, req, res, next) {
    var message = {
        status: 'error',
        message: err
    };
    vplog.err(JSON.stringify(message));
    res.status( err.code || 500 )
    .json(message);
});

// WEB SERVER STARTUP ---------------------------------------------------------

app.listen(c.webPort, function () {
    vplog.printServerInfo(c.webPort)
})
