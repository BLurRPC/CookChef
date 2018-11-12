<template>
  <div class="main">
  
    <h2>Créer une nouvelle recette !  </h2>
  
    <form @submit.prevent @submit="addArticle($event)">
  
      <div class="form-group">
  
        <input type="text" class="form-control" placeholder="Titre de la recette" v-model="title">
        <input type="text" class="form-control" placeholder="La recette" v-model="description">
        <input type="file" ref="file" name="file" @change="handleFileUpload()">
        <input type="text" class="form-control" placeholder="Ajoutez un ingrédient" v-model="ingredient">
        <button type="button" v-on:click="handleIngredient()">Ajoutez l'ingrédient à la liste des ingrédients</button>
        <button type="submit">Ajouter la recette</button>
        <p v-if="ingredients.length">
          <b>Liste des ingrédients pour cette recette :</b>
          <ul>
            <li v-for="ingredient in ingredients">{{ ingredient }}</li>
          </ul>
        </p>
        <p v-if="errors.length">
          <b>Veuillez corriger les erreur(s) suivantes :</b>
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
        ingredient: '',
        ingredients: [],
        errors: []
      }
  
    },
  
    methods: {

      checkForm() {
        if(this.title && this.description && this.file && this.ingredients.length > 0) { //Check if form fields are not empty
          return true;
        }
        this.errors = [];

        if(!this.title) {
          this.errors.push('Votre recette n\'a pas de titre !');
        }
        if(!this.description) {
          this.errors.push('Votre recette n\'a pas de description !');
        }
        if(!this.file) {
          this.errors.push('Votre recette n\'a pas d\'image !');
        }
        if(this.ingredients.length == 0) {
          this.errors.push('Votre recette a besoin d\'au moins un ingrédient !');
        }
        return false;
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },

      handleIngredient() {
        if(this.ingredient) {
          this.ingredient = this.ingredient.charAt(0).toUpperCase() + this.ingredient.substr(1).toLowerCase();
          console.log("ok "+ this.ingredient);
          if(!this.ingredients.includes(this.ingredient)) {
            this.ingredients.push(this.ingredient);
            console.log("Added " + this.ingredients);
            this.ingredient = '';
          }
          else {
             console.log(this.ingredient + "already added.")
          }
        }
        else {
             console.log("field is empty.")
          }
      },

      addArticle(event) {
        if (event) event.preventDefault();
        if(this.checkForm()) {
          let url = '/api/add';
          var bodyFormData = new FormData();
          bodyFormData.set('title', this.title);
          bodyFormData.set('description', this.description);
          bodyFormData.set('ingredients', this.ingredients);
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
        this.ingredient = '';
        this.ingredients = [];
        this.errors = [];
      },
  
  
  
      refreshArticle() {
  
  
  
        bus.$emit("refreshArticle");
  
  
  
      }
  
  
  
    }
  
  
  }
</script>
