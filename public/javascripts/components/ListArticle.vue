<template>
    <div>
        <h3 class="allArticles">Toutes nos recettes de dessert</h3>
        <div class="main" v-show="articles.length>0">
            <div class="search-wrapper">
                <input type="text" v-model="search" placeholder="Rechercher par titre de recette ..."/>
            </div><br/>
            <div class="item" v-for="article in filteredList" :key="article.id">
                <h1>{{article.title}}</h1>
                <img :src="article.picturePath" @error="ErrorImage(article.picturePath)" v-on:click="showDescription(article)"><br/>
                <div v-if="article.show">
                    <div v-for="(etape, index) in article.description" :key="etape.id">
                        <p><b> Etape {{index + 1}} :</b> {{etape}}</p>
                        <input type="text" class="form-control" placeholder="Ecrivez ici pour modifier cette étape puis appuyez sur Entrée !" v-show="isconnected" v-model="etapeUpdate" @keyup.enter="updateEtape(index, article)">
                    </div>
                    <div class="ingredients">
                        <h4>Liste des ingrédients requis :</h4>
                        <ul>
                            <li v-for="ingredient in article.ingredients">{{ ingredient }}</li>
                        </ul>
                    </div>
                </div>
                <span v-show="isconnected" class="deleteButton" title="Supprimer cette recette ?" v-on:click="deleteArticle(article.id)">X</span>
            </div>
        </div>


        <div v-show="articles.length==0">


            <p>
                <strong>Aucune Recette !</strong>
                <br/>L'admin a dû faire une bêtise ...
            </p>

        </div>


    </div>
</template>

<script>
    import axios from 'axios';

    import bus from './../bus.js'


    export default {

        data() {

            return {
                articles: [],
                search: '',
                isconnected: false
            }

        },

        computed: {
            filteredList: function () {
                return this.articles.filter(article => {
                    return article.title.toLowerCase().includes(this.search.toLowerCase());
                })
            }
        },

        created: function () {
            this.fetchArticle();
            this.listenToEvents();
        },

        methods: {

            showDescription(article) {
                article.show = !article.show;
                this.$forceUpdate()
            },

            ErrorImage(path) {
                console.log('problem with image');
                console.log(path);
            },

            fetchArticle() {

                let uri = '/all';
                axios.get(uri).then((response) => {
                    try {
                        this.articles = response.data;
                        for(var i=0; i<this.articles.length; i++) {
                            this.articles[i].show = false;
                        }
                    } catch (err) {
                        console.log(err)
                    }
                    
                });

            },

            updateEtape(index, article) {
                if (this.etapeUpdate !== undefined && this.etapeUpdate!='') {
                    console.log("etape id : " + index);
                    console.log("etape : " + this.etapeUpdate);
                    let uri = '/update/' + article.id;
                    axios.post(uri, {'etape': this.etapeUpdate, 'index': index}).then((response) => {

                        console.log(response);
                        this.etapeUpdate= '';
                        this.fetchArticle();

                    }).catch((error) => {

                        console.log(error);

                    })
                }
            },


            deleteArticle(id) {

                let uri = '/delete/' + id;

                axios.get(uri);

                this.fetchArticle();

            },

            listenToEvents() {

                bus.$on('refreshArticle', ($event) => {

                    this.fetchArticle(); //update article

                })

                bus.$on('loggedin', ($event) => {
                    this.isconnected = $event;
                })
            }

        }

    }
</script>

<style scoped>
    .delete__icon {
    }

    .article__done {

        text-decoration: line-through !important

    }

    .no_border_left_right {

        border-left: 0px;

        border-right: 0px;

    }

    .flat_form {

        border-radius: 0px;

    }

    .mrb-10 {

        margin-bottom: 10px;

    }

    .addon-left {

        background-color: none !important;

        border-left: 0px !important;

        cursor: pointer !important;

    }

    .addon-right {

        background-color: none !important;

        border-right: 0px !important;

    }
</style>
