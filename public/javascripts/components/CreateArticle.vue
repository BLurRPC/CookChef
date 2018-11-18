<template>
  <div v-show="isconnected" class="main3">
  
    <h2>Créer une nouvelle recette !  </h2>
  
    <form @submit.prevent @submit="addArticle($event)">
  
      <div class="form-group item">
  
        <input type="text" class="form-control" placeholder="Titre de la recette" v-model="title">
        <input type="file" ref="file" name="file" @change="handleFileUpload()" placeholder="Image de votre recette">
        <input type="text" class="form-control" placeholder="Ajoutez une étape à la recette" v-model="etape">
        <button type="button" v-on:click="handleEtape()">Ajoutez une étape à votre recette</button>
        <p v-if="description.length">
          <b>Etapes de la recette :</b>
          <p v-for="(etape, index) in description">Etape {{index+1}} : {{ etape }}</p>
        </p>
        <input type="text" class="form-control" placeholder="Ajoutez un ingrédient à la recette" v-model="ingredient">
        <button type="button" v-on:click="handleIngredient()">Ajoutez cet ingrédient à votre recette</button>
        <p v-if="ingredients.length">
          <b>Liste des ingrédients pour cette recette :</b>
          <ul>
            <li v-for="ingredient in ingredients">{{ ingredient }}</li>
          </ul>
        </p>
        <button class="mainButton" type="submit">Ajouter la recette</button>
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
        etape: '',
        description: [],
        file: '',
        ingredient: '',
        ingredients: [],
        errors: [],
        isconnected: false
      }
  
    },

    created: function () {
        this.listenToEvents();
    },
  
    methods: {

      checkForm() {
        if(this.title && this.file && this.ingredients.length > 0 && this.description.length > 0) { //Check if form fields are not empty
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
        if(this.description.length == 0) {
          this.errors.push('Votre recette a besoin d\'au moins une étape !');
        }
        return false;
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

      handleIngredient() {
        if(this.ingredient) {
          this.ingredient = this.ingredient.charAt(0).toUpperCase() + this.ingredient.substr(1).toLowerCase();
          if(!this.ingredients.includes(this.ingredient)) {
            this.ingredients.push(this.ingredient);
            this.ingredient = '';
          }
          else {
             console.log(this.ingredient + " already added.")
          }
        }
        else {
             console.log("field is empty.")
          }
      },

      handleEtape() {
        if(this.etape) {
          this.etape = this.etape.charAt(0).toUpperCase() + this.etape.substr(1).toLowerCase();
          if(!this.description.includes(this.etape)) {
            this.description.push(this.etape);
            this.etape = '';
          }
          else {
             console.log(this.etape + " already added.")
          }
        }
        else {
             console.log("field is empty.")
          }
      },

      addArticle(event) {
        if (event) event.preventDefault();
        if(this.checkForm()) {
          let url = '/add';
          var bodyFormData = new FormData();
          bodyFormData.set('title', this.title);
          bodyFormData.set('description', this.description);
          bodyFormData.set('ingredients', this.ingredients);
          bodyFormData.append('file', this.file);
          axios.post(url, bodyFormData).then((response) => {
            this.clearArticle();
            this.refreshArticle();
          }).catch((error) => {
            console.log(error);
    
          })

        }
      },
  
  
  
      clearArticle() {  
        this.title = '';
        this.etape= '';
        this.description = [];
        this.picturePath = '';
        this.ingredient = '';
        this.ingredients = [];
        this.errors = [];
      },

      listenToEvents() {
         bus.$on('loggedin', ($event) => {
          this.isconnected = $event;
        })
      },

      refreshArticle() {
        bus.$emit("refreshArticle");  
      }
  
  
  
    }
  
  
  }
</script>
