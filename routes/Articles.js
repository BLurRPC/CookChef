var mongoose = require('mongoose')
// Define collection and schema for todo item

var article = new mongoose.Schema({
    name: {
      type: String
    },
  
    done: {
      type: Boolean
    }
  },
  
    {
      collection: 'articles'
    }
  )
  
  module.exports = mongoose.model('Article', article)