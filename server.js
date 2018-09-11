const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./api/routes/config');
// Get our API routes
const api = require('./api/routes/clientsApi');

mongoose.connect('mongodb://' + config.mlab_UserName + ':' + config.mlab_password + '@ds123372.mlab.com:23372/portfolio' , 
{ useNewUrlParser: true },
 function() {
  console.log("DB connection established!!!");
});

const app = express();


app.use(express.static('public'));
app.use(express.static('node_modules'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set our api routes
app.use('/clients', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || '3500';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));