<template>
  <div>
  
    <h2>Create a Article List</h2>
  
    <form @submit.prevent>
  
      <div class="form-group">
  
        <input type="text" class="form-control" @keypress="typing=true" placeholder="What do you want to do?" v-model="articleTitle" @keyup.enter="addArticle($event)">
  
        <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
  
      </div>
  
    </form>
  </div>
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";
  
  export default {
    data() {
      return {
        articleTitle: '',
        typing: false,
      }
  
    },
  
    methods: {
  
      addArticle(event) {
        if (event) event.preventDefault();
  
        let url = 'http://localhost:4000/api/add';
        let param = {
          title: this.articleTitle,
          done: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearArticle();
          this.refreshArticle();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
  
        })
  
  
  
      },
  
  
  
      clearArticle() {
  
  
  
        this.article = '';
  
  
  
      },
  
  
  
      refreshArticle() {
  
  
  
        bus.$emit("refreshArticle");
  
  
  
      }
  
  
  
    }
  
  
  }
</script>
