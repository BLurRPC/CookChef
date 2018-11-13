//server.js

/* jslint node: true */
'use strict'
var express = require('express')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
const session = require('express-session')

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '/public')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

var port = 4000

app.listen(port) // Listen on port defined in config file

console.log('App listening on port ' + port)

// add & configure middleware
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

var articleRoutes = require('./routes/index')

//  Use routes defined in Route.js and prefix it with api
app.use('/', articleRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
  next()
})