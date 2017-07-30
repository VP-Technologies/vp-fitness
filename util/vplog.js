// This is a file that contains utility functions for logging; for example,
// the functions to print information when the server starts.
//
// Written by Aaron Vontell (vontell)
// Version 0.0.1

var winston = require('winston');
var clc     = require('cli-color');
var c       = require('../constants');

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

// Prints basic information about the server, usually used on startup
function printServerInfo(port) {
    console.log(error('------------------------------------------------------------------\n' +
                 c.banner + '\n Webserver Version ' + c.version + 
                '\n------------------------------------------------------------------\n'))
    winston.info(notice('Started Assistant server for on port ' + port));
}

// Prints new user information (might be for debugging only?)
function newUser(username) {
    info("Added new user '" + username + "'");
}

function info(message) {
    winston.info(notice(message));
}

function err(message) {
    winston.error(warn(message));
}

module.exports = {
    printServerInfo: printServerInfo,
    newUser: newUser,
    info: info,
    err: err 
};