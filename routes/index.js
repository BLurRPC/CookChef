'use strict'

var express = require('express')

var articleRoutes = express.Router()

var Articles = require('./Articles')

var multer = require('multer');

var path = require('path')

var crypto = require('crypto');

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

// get all articles in the db

articleRoutes.route('/all').get(function (req, res, next) {
    res.json(Articles) // return all articles
  })

// create an article item
articleRoutes.route('/add').post(upload.any(), function (req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const file = req.files[0];
  var path = "/images/" + file.filename;
  console.log(path)
  Articles.push({title: title, description: description, picturePath: path});
  res.json(Articles)
})

// delete an article item

articleRoutes.route('/delete/:id').get(function (req, res, next) {
  var title = req.params.id
  for(var i=0; i< Articles.length; i++)
  {
    if(Articles[i].title == title) {
      Articles.splice(i, 1);
    }
  }
  res.json('Successfully removed')
})

// perform update on article item

articleRoutes.route('/update/:id').post(function (req, res, next) {
  var title = req.params.id
  for(var i=0; i< Articles.length; i++)
  {
    if(Articles[i].title == title) {
      Articles[i].description= req.body.description
    }
  }
  res.json('Successfully removed')
})

module.exports = articleRoutes
