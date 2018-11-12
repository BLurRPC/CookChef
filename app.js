//server.js

/* jslint node: true */
'use strict'
var express = require('express')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
const uuid = require('uuid/v4')
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

var articleRoutes = require('./routes/index')

//  Use routes defined in Route.js and prefix it with api
app.use('/api', articleRoutes)

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

const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]
// add & configure middleware
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === users[0].email && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// create the login get and post routes
app.get('/login', (req, res) => {
  res.sendfile('./public/login.html')
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
})

app.post('/login', (req, res) => {
  console.log('Inside POST /login callback')
  if(!req.body.email || !req.body.password) {
    res.send('login failed')
  }
  else if(req.body.email == users[0].email && req.body.password == users[0].password) {
    console.log("Logged in")
    req.session.user = req.body.email
    req.session.admin = true
  }
  res.redirect('/')
})

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Server index.html page when request to the root is made
app.get('/', function (req, res) {
  res.sendfile('./public/index.html')
})