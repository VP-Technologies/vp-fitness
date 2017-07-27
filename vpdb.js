// This file contains logic for accessing the database, which
// is a PostgreSQL database.
//
// Written by Aaron Vontell (vontell)
// Version 1.0.0 (July 23, 2017)

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
var connectionString = c.db;
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

function getUser(userId, callback) {
    db.one('select id, username, name, email, active, created from users')
        .then(function (data) {
            callback(data);
    })
    .catch(function (err) {
            callback(err);
    });
}

// Creates a new user from the given information
function createUser(req, res, next) {
    
    req.body.notifs = req.body.notifs == "true";
    bcrypt.hash(req.body.password, 8, function(err, hash) {
        
        req.body.password = hash;
        db.none('insert into users(username, email, name, password)' +
        'values(${username}, ${email}, ${name}, ${password})',
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
            res.status(500)
            .json({
                status: 'failure',
                message: 'Failure to create user; did you forget to set the email, username, or name?'
            });
            //return next(err);
        });
        
    });

}

// Returns true if this is a valid username and password; false otherwise
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

// Creates a user info entry for a specific user
function createUserInfo(req, res, next) {
    
    getUser(req.user.id, function(user) {
        req.body.username = user.username
        // If the user info already exists, throw an error
        db.any("select username from userinfo where username = ${username}", req.body)
        .then(function(results) {
            if (results.length > 0) {
                res.status(500)
                .json({
                    status: "failure",
                    message: "User info already exists for this user."
                });
                return next();
            }
            else {
                db.none('insert into userinfo(age, weight, height, goal_weight, difficulty, equipment, username)' +
                'values(${age}, ${weight}, ${height}, ${goal_weight}, ${difficulty}, ${equipment}, ${username})',
                req.body)
                .then(function () {
                    res.status(200)
                    .json({
                        status: 'success',
                        message: 'User info added'
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
            }
        });
    });
    
}

// Updates a user info entry for a specific user
function updateUserInfo(req, res, next) {
    
    getUser(req.user.id, function(user) {
        
        // Validate before making the query
        if ("username" in req.body || "id" in req.body) {
            res.status(500)
            .json({
                status: 'failure',
                message: 'username or id cannot be updated.'
            });
        } else {
            
            var query = updateQuery("userinfo", "username", user.username, req.body);
            db.none(query, req.body)
            .then(function(data) {
                getUserInfo(req, res, next);
            })
            .catch(function (err) {
                res.status(500)
                .json({
                    status: 'failure',
                    message: 'invalid parameter for userinfo update'
                });
                //return next(err);
            });
            
        }
    });
    
}

// Retrieves a user info entry for a specific user
function getUserInfo(req, res, next) {
    
    getUser(req.user.id, function(user) {
        db.one('select * from userinfo where username=${username}',
                user)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: "success",
                        data: data
                    });
            })
            .catch(function (err) {
                res.status(200)
                .json({
                    status: 'failure',
                    message: 'No user info found for this user'
                });
                //return next(err);
            });
    });
    
}

// Retrieves a user entry for a specific user
function getThisUser(req, res, next) {
    
    getUser(req.user.id, function(user) {
        db.one('select id, username, email, name, active, created from users where username=${username}',
                user)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: "success",
                        data: data
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });
    
}

// Updated a user entry for a specific user
function updateThisUser(req, res, next) {
    
    getUser(req.user.id, function(user) {
        
        // Validate before making the query
        if ("username" in req.body || "id" in req.body || "password" in req.body || "created" in req.body) {
            res.status(500)
            .json({
                status: 'failure',
                message: 'username, id, password, or created cannot be updated.'
            });
        } else {
            
            var query = updateQuery("users", "username", user.username, req.body);
            db.none(query, req.body)
            .then(function(data) {
                getThisUser(req, res, next);
            })
            .catch(function (err) {
                res.status(500)
                .json({
                    status: 'failure',
                    message: 'invalid parameter for user update'
                });
                //return next(err);
            });
            
        }
    });
    
}

// Export for use in other modules
module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    validateUser: validateUser,
    createUserInfo: createUserInfo,
    getUserInfo: getUserInfo,
    updateUserInfo: updateUserInfo,
    getThisUser: getThisUser,
    updateThisUser: updateThisUser
};

// Helper functions
var escapeRegExp = function(strToEscape) {
    // Escape special characters for use in a regular expression
    return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

var trimChar = function(origString, charToTrim) {
    charToTrim = escapeRegExp(charToTrim);
    var regEx = new RegExp("^[" + charToTrim + "]+|[" + charToTrim + "]+$", "g");
    return origString.replace(regEx, "");
};

function updateQuery (table, where, id, cols) {
  // Setup static beginning of query
  var query = ['UPDATE ' + table];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ${' + key + '}'); 
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE ' + where + ' = \'' + id + "\'");

  // Return a complete query string
  return query.join(' ');
}
