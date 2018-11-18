'use strict'

var express = require('express');
var articleRoutes = express.Router();
var Articles = require('./Articles');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
const fs = require('fs');
const bcrypt = require('bcrypt');
var storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images'),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage })

// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync("password", salt);
const users = [
  {email: 'test@test.com', hash: hash}
]

// Server index.html page when request to the root is made
articleRoutes.route('/').get(function (req, res) {
  res.sendfile('./public/index.html')
})

articleRoutes.route('/sessionStatus').get(function(req, res) {
  if (req.session && req.session.user == users[0].email && req.session.admin) {
    res.send("admin")
  }
  else {
    res.send("notadmin")
  }
})

// get all articles in the db
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

articleRoutes.route('/login').post(function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.send('failed to log in')
  }
  else if(req.body.email == users[0].email && bcrypt.compareSync(req.body.password, users[0].hash)) {
    req.session.user = users[0].email
    req.session.admin = true
    res.send('logged in')
  }
  else {
    res.send('failed to log in')
  }
})

// Logout endpoint
articleRoutes.route('/logout').get(function (req, res) {
  req.session.destroy();
  res.redirect('/')
});

articleRoutes.route('/all').get(function (req, res, next) {
    res.json(Articles) // return all articles
  })

// create an article item
articleRoutes.route('/add').post(upload.any(), auth, function (req, res) {
  var id = 0;
  if(Articles.length>0) {
    id = Articles[Articles.length-1].id + 1 //Add A to the new article id
  }
  else {
    id = 6;
  }
  const title = req.body.title;
  const description = req.body.description.split(",");
  var ingredients = req.body.ingredients.split(",");
  for (var ingredient in ingredients) {
    ingredient = ingredient.charAt(0).toUpperCase() + ingredient.substr(1).toLowerCase();
  }
  for (var etape in description) {
    etape = etape.charAt(0).toUpperCase() + etape.substr(1).toLowerCase();
  }
  const file = req.files[0];
  var path = "/images/" + file.filename;
  console.log(path)
  Articles.push({id: id, title: title, description: description, picturePath: path, ingredients: ingredients});
  res.json(Articles)
})

// delete an article item

articleRoutes.route('/delete/:id').get(auth, function (req, res) {
  var id = req.params.id
  for(var i=0; i< Articles.length; i++)
  {
    if(Articles[i].id == id) {
      if(id>5) { //Prevent from deleting the first two pictures from memory
        fs.unlink("./public" + Articles[i].picturePath, (err) => { //Remove picture from memory
          if (err) throw err;
          console.log('successfully deleted picture');
        });
      }
      Articles.splice(i, 1); //Remove from array
    }
  }
  res.json('Successfully removed')
})

// perform update on article item

articleRoutes.route('/update/:id').post(auth, function (req, res) {
  var etape = req.body.etape;
  var index = req.body.index;
  var id = req.params.id;
  for(var i=0; i< Articles.length; i++)
  {
    if(Articles[i].id == id) {
      Articles[i].description[index] = etape
      res.json('Successfully updated')
    }
  }
})

module.exports = articleRoutes
