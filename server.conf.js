// ```
// server.conf.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// server.conf.js may be freely distributed under the MIT license
// ```

// *server.conf.js*

//  This is the file where we will:
//  - Configure our application
//  - Connect to our database
//  - Create our Mongoose models
//  - Define routes for our RESTful API
//  - Define routes for our frontend Angular application
//  - Set the app to listen on a port so we can view it in our browser

// # Node Env Variables

// Load Node environment variable configuration file
import {validateEnvVariables} from './config/env.conf.js';

// Set up appropriate environment variables if necessary
validateEnvVariables();

// # Modules
//Session
import session from 'express-session';
//Load Connnect-Redis
const RedisStore = require('connect-redis')(session);
// Load Express
import express from 'express';
//load fs
import fs from 'fs-extra';
// Load Socket.io
import socketio from 'socket.io';
// Load Node http module
import http from 'http';
// Create our app with Express
let app = express();
// Create a Node server for our Express app
let server = http.createServer(app);
// Integrate Socket.io
let io = socketio.listen(server);
// Load Mongoose for MongoDB interactions
import mongoose from 'mongoose';
// Log requests to the console (Express 4)
import morgan from 'morgan';
// Pull information from HTML POST (express 4)
import bodyParser from 'body-parser';
// Simulate DELETE and PUT (Express 4)
import methodOverride from 'method-override';
// PassportJS
import passport from 'passport';
import cookieParser from 'cookie-parser';

// # Configuration.


// Load Socket.io server functionality
import base from './sockets/base';

base(io);

// Set the port for this app
let port = process.env.PORT || 8080;

// Load Mongoose config file for connecting to MongoDB instance
import mongooseConf from './config/mongoose.conf.js';


//Constantly checking for the state of the mongoDB connection.
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});

//Use mongoose(replaced mongooseConfig(mongoose);)
mongoose.connect('mongodb://localhost/test');

//The code below checks the state of the connection and returns a
//number that indicates the state of the mongoDB connection
//console.log(mongoose.connection.readyState);


//OLD

// Import PassportJS configuration
//import passportConf from './config/passport.conf.js';

// Pass Passport configuration our PassportJS instance
//passportConf(passport);

if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test')
  // Log every request to the console
  app.use(morgan('dev'));

// Read cookies (needed for authentication)
app.use(cookieParser());

// ## Get all data/stuff of the body (POST) parameters

// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist'));

// ## Passport JS

//OLDER SESSION.JS, to be reused if the new one does not work
/*

// Session secret
app.use(session({

  secret : process.env.SESSION_SECRET,

  resave : true,

  saveUninitialized : true
}));

app.use(passport.initialize());

// Persistent login sessions
app.use(passport.session());
*/

//New version of the passport.js stuff

app.use(session({
  //iii removed the redisstore
  //!!! the secret is not safe enough
  secret:"config.redisStore.secret",
  resave:false,
  saveUninitialized:false
}))
require("./app/NEWauthenticate/init.js")(passport);
app.use(passport.initialize());
app.use(passport.session());

// ## Routes

// Get an instance of the express Router
let router = express.Router();

// Load our application API routes
// Pass in our express and express router instances
import routes from './app/routes';

// Pass in instances of the express app, router, and passport
routes(app, router, passport);


// ### Ignition Phase

server.listen(port);

// Shoutout to the user
console.log(`Wizardry is afoot on port ${port}`);

// Expose app
export {app};
