// This file contains logic for accessing the database, which
// is a PostgreSQL database.
//
// Written by Aaron Vontell (vontell)
// Version 1.0.0 (July 9, 2017)

// MODULE DEPS ----------------------------------------------------------------
// Incorporate all of our modules needed to run this thing
//      ./constants - ports, naming, urls, logos, etc... Found in constants.js
//      bluebird - a better promise library according to the mherman.org blog
//      ./util/vplog - used for web logging
//      bcrypt - salting and hashing for user creation

const c       = require('./constants');
const promise = require('bluebird');
const vplog   = require('./util/vplog');
const bcrypt  = require('bcrypt');

// LOGIC / QUERY FUNCTIONS ----------------------------------------------------

var pgp = require('pg-promise')(c.dbOptions);
var connectionString = 'postgres://localhost:'+ c.dbPort +'/' + c.dbName;
var db = pgp(connectionString);

// ----------------------------------------------------------------------------
// USER METHODS ---------------------------------------------------------------
// ----------------------------------------------------------------------------

// Gets all users in the database
function getAllUsers(req, res, next) {
    db.any('select * from users')
        .then(function (data) {
            res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Users found'
            });
    })
    .catch(function (err) {
        return next(err);
    });
}

// Creates a new user from the given information
function createUser(req, res, next) {
    
    req.body.notifs = req.body.notifs == "true";
    bcrypt.hash(req.body.password, 8, function(err, hash) {
        
        req.body.password = hash;
        db.none('insert into users(username, email, password)' +
        'values(${username}, ${email}, ${password})',
        req.body)
        .then(function () {
            vplog.newUser(req.body.username);
            res.status(200)
            .json({
                status: 'success',
                message: 'Inserted new user ' + req.body.username
            });
        })
        .catch(function (err) {
            return next(err);
        });
        
    });

}

function validateUser(username, password, cb) {
    db.one("select password from users where username='" + username + "'")
        .then(function (data) {
            cb(bcrypt.compareSync(password, data.password));
        })
    .catch(function (err) {
        vplog.err(JSON.stringify(err));
        cb(false);
    });
}

// Export for use in other modules
module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    validateUser: validateUser
};
