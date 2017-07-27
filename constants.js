// This file contains a list of all constants used throughout the application.
// This includes things such as the server port, database urls, organization
// names and logos, etc...
//
// Created by Aaron Vontell (vontell)
// Version 1.0.0 (July 9, 2017)

// Version of the webserver/website
const version = "1.0.0 BETA";

// Port for the server to run on
const webPort = 3000;

// URI of the PotgreSQL database
const dbUri = "postgres://cdorijrhpwkonl:59d7a61726defa3de5d21a24d0541e4002b667c16d7a970431388bfeef42d65d@ec2-54-235-123-159.compute-1.amazonaws.com:5432/dov29q0cnq2q5";

// Port that the database is running on
const dbPort = 5432;

// The name of the database
const dbName = 'vpfit';

var dev = true;
var db = "";
if (dev) {
    db = 'postgres://localhost:'+ dbPort +'/' + dbName;
} else {
    db = 'postgres://cdorijrhpwkonl:59d7a61726defa3de5d21a24d0541e4002b667c16d7a970431388bfeef42d65d@ec2-54-235-123-159.compute-1.amazonaws.com:5432/dov29q0cnq2q5';
}

// Database configuration options
const dbOptions = {
    // Initialization Options
//    promiseLib: promise
};

// Client id and client secret for OAuth 2.0
// NOTE: The client secret should be kepy secret! Preferably set this variable
// as an environment variable; for now, this is public for debugging purposes.
// NOTE: If these are changed, then you will also need to update the
// AuthService within the AngularJS frontend, within /public/js/app.js (to
// include the new Base64 encoding of these objects -> id:secret)
// Happens to be: dnBmaXR3ZWJhcHA6SkJVWTlWRTY5MjQzQllDOTAyNDM4N0hHVlkzQVFGSw==
const client_id = "vpfitwebapp";
const client_secret = "JBUY9VE69243BYC9024387HGVY3AQFK";

// A sweet ascii banner for the console
const ascii_banner = "$$\\    $$\\ $$$$$$$\\        $$$$$$$$\\ $$$$$$\\ $$$$$$$$\\ \r\n$$ |   $$ |$$  __$$\\       $$  _____|\\_$$  _|\\__$$  __|\r\n$$ |   $$ |$$ |  $$ |      $$ |        $$ |     $$ |   \r\n\\$$\\  $$  |$$$$$$$  |      $$$$$\\      $$ |     $$ |   \r\n \\$$\\$$  \/ $$  ____\/       $$  __|     $$ |     $$ |   \r\n  \\$$$  \/  $$ |            $$ |        $$ |     $$ |   \r\n   \\$  \/   $$ |            $$ |      $$$$$$\\    $$ |   \r\n    \\_\/    \\__|            \\__|      \\______|   \\__|   \r\n                                                       \r\n                                                       \r\n                                                       ";

// Now let's export them so we can use em!
module.exports = {
    version: version,
    banner: ascii_banner,
    webPort: webPort,
    dbName: dbName,
    dbUri: dbUri,
    dbPort: dbPort,
    dbOptions: dbOptions,
    db: db,
    client_id: client_id,
    client_secret: client_secret
}