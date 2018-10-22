<template>
  <div>
  
    <h2>Create an Article List</h2>
  
    <form @submit.prevent @submit="addArticle($event)">
  
      <div class="form-group">
  
        <input type="text" class="form-control" placeholder="Your article title ?" v-model="title">
        <input type="text" class="form-control" placeholder="Your article description ?" v-model="description">
        <input type="file" ref="file" name="file" @change="handleFileUpload()">
  
        <input type="submit" value="Add Article"/>
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
        file: '',
        errors: []
      }
  
    },
  
    methods: {

      checkForm() {
        if(this.title && this.description && this.file) { //Check if form fields are not empty
          return true;
        }
        this.errors = [];

        if(!this.title) {
          this.errors.push('Title required');
        }
        if(!this.description) {
          this.errors.push('Description required');
        }
        if(!this.file) {
          this.errors.push('Picture required');
        }
        return false;
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },

      addArticle(event) {
        if (event) event.preventDefault();
        if(this.checkForm()) {
          let url = '/api/add';
          var bodyFormData = new FormData();
          bodyFormData.set('title', this.title);
          bodyFormData.set('description', this.description);
          bodyFormData.append('file', this.file);
          axios.post(url, bodyFormData).then((response) => {
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
