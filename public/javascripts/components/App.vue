<template>
  <div id="app">
  
    <div class="container">
  
      <div class="row col-md-6 offset-md-3">
  
        <create-article></create-article>
  
        <list-article></list-article>
  
      </div>
  
    </div>
  
  </div>
</template>


<script>
  import CreateArticle from './CreateArticle.vue';
  
  import ListArticle from './ListArticle.vue';
  
  
  
  export default {
  
    name: 'app',
  
    data() {
  
      return {}
  
    },
  
    components: {
  
      CreateArticle,
  
      ListArticle
  
    },
  
  
  
  }
</script>


<style>
  .fade-enter-active,
  
  .fade-leave-active {
  
    transition: opacity .5s
  
  }
  

  .fade-enter,
  
  .fade-leave-active {
  
    opacity: 0
  
  }
</style>