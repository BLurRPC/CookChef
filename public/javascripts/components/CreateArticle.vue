<template>
  <div>
  
    <h2>Create an Article List</h2>
  
    <form @submit.prevent @submit="addArticle($event)">
  
      <div class="form-group">
  
        <input type="text" class="form-control" placeholder="Your article title ?" v-model="title">
        <input type="text" class="form-control" placeholder="Your article description ?" v-model="description">
        <input type="text" class="form-control" placeholder="Your picture ?" v-model="picturePath">
  
        <input type="submit" value="Add article"/>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
  
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
        title: '',
        description: '',
        picturePath: '',
        errors: [],
      }
  
    },
  
    methods: {

      checkForm() {
        if(this.title && this.picturePath && this.description) { //Check if form fields are not empty
          return true;
        }
        this.errors = [];

        if(!this.title) {
          this.errors.push('Title required');
        }
        if(!this.description) {
          this.errors.push('Description required');
        }
        if(!this.picturePath) {
          this.errors.push('Picture required');
        }
        return false;
      },

      addArticle(event) {
        if (event) event.preventDefault();
        if(this.checkForm()) {
          let url = 'http://localhost:4000/api/add';
        let param = {
          title: this.title,
          description: this.description,
          picturePath: this.picturePath,
          done: 0
        };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearArticle();
          this.refreshArticle();
        }).catch((error) => {
          console.log(error);
  
        })

        }
      },
  
  
  
      clearArticle() {  
        this.title = '';
        this.description = '';
        this.picturePath = '';
        this.errors = [];
      },
  
  
  
      refreshArticle() {
  
  
  
        bus.$emit("refreshArticle");
  
  
  
      }
  
  
  
    }
  
  
  }
</script>
