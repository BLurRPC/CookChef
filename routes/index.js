'use strict'

var express = require('express')

var articleRoutes = express.Router()

var Article = require('./Articles')

// get all articles in the db

articleRoutes.route('/all').get(function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) {
      return next(new Error(err))
    }

    res.json(articles) // return all todos
  })
})

// create a article item
articleRoutes.route('/add').post(function (req, res) {
  Article.create(
    {
      name: req.body.name,
      done: false
    },
    function (error, article) {
      if (error) {
        res.status(400).send('Unable to create article list')
      }
      res.status(200).json(article)
    }
  )
})

// delete a article item

articleRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  Article.findByIdAndRemove(id, function (err, article) {
    if (err) {
      return next(new Error('Article was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update on article item

articleRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  Article.findById(id, function (error, article) {
    if (error) {
      return next(new Error('Article was not found'))
    } else {
      article.name = req.body.name
      article.done = req.body.done

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
