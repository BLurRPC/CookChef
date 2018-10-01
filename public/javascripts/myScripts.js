function createNewArticle(title, picture, text) {
    var obj = {};
    obj.title = title;
    obj.picture = picture;
    obj.text = text;
    return obj;
  }

  var articles = [];
  myArticle = createNewArticle("Titre 1", "images/thumbs/01.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 2", "images/thumbs/02.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 3", "images/thumbs/03.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 4", "images/thumbs/04.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 5", "images/thumbs/05.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 5", "images/thumbs/05.jpg", "J'aime les giraphes");
  articles.push(myArticle);
  myArticle = createNewArticle("Titre 5", "images/thumbs/05.jpg", "J'aime les giraphes");
  articles.push(myArticle);

  // register modal component
Vue.component('modal', {
  template: '#modal-template'
})

  var app5 = new Vue({
    el: '#app-5',
    data: {
      articles,
      showModal: false
    }
  })