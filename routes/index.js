'use strict'

var express = require('express')

var articleRoutes = express.Router()

var Articles = require('./Articles')

// get all articles in the db

articleRoutes.route('/all').get(function (req, res, next) {
    res.json(Articles) // return all articles
  })

// create an article item
articleRoutes.route('/add').post(function (req, res) {
  const article = req.body;
  Articles.push(article)
  res.json(article)
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
  var id = req.params.id
  Article.findById(id, function (error, article) {
    if (error) {
      return next(new Error('Article was not found'))
    } else {
      article.title= req.body.title,
      article.description= req.body.description,
      article.picturePath= req.body.picturePath,
      article.done= false

      article.save({
        function (error, article) {
          if (error) {
            res.status(400).send('Unable to update article')
          } else {
            res.status(200).json(article)
          }
        }
      })
    }
  })
})

module.exports = articleRoutes
