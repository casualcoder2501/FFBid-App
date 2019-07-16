var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = 3000;
const mongoConfig = require('./mongo.config')
var users = require('./routes/users');
let stations = require('./routes/stations')
let dbClient;
let MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });
app.use('/api/users', users);
app.use('/api/stations', stations)


// connects to the mongo database and then shares that connection throughout
// the application via the app.locals storage
MongoClient.connect(mongoConfig.url, { poolSize: 15, useNewUrlParser: true, autoReconnect: true, numberOfRetries: 5 })
    .then(client => {
        const db = client.db('Departments');
        dbClient = client;
        app.locals.db = db; // stores database connection
        app.locals.client = client; // stores mongo client to change databases if need be
        console.log(app.locals.db);
        app.listen(port, () => console.info(`REST API running on port ${port}`));
    }).catch(error => console.error(error));

process.on('SIGINT', () => {
    console.log('node app is closing')
    dbClient.close();
    process.exit();
})


module.exports = app;











