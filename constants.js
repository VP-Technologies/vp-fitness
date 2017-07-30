// This file contains a list of all constants used throughout the application.
// This includes things such as the server port, database urls, organization
// names and logos, etc...
//
// Created by Aaron Vontell (vontell)
// Version 0.0.1 (July 9, 2017)

// Version of the webserver/website
const version = "0.0.1 BETA";

// Port for the server to run on
var webPort = 3000;
if (process.env.PORT) {
    webPort = process.env.PORT;
}

// Port that the database is running on
const dbPort = 5432;

// The name of the database
const dbName = 'vpfit';

var db = 'postgres://localhost:'+ dbPort +'/' + dbName;
if (process.env.DATABASE_URL) {
    db = process.env.DATABASE_URL;
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
    dbPort: dbPort,
    dbOptions: dbOptions,
    db: db,
    client_id: client_id,
    client_secret: client_secret
}