<template>
    <div>
        <h3 class="allArticles">Toutes nos recettes</h3>
        <div class="main" v-show="articles.length>0">
            <div class="item" v-for="article in articles" :key="article.id">
                <h1>{{article.title}}</h1>
                <img :src="article.picturePath" @error="ErrorImage(article.picturePath)"><br/>
                <div v-if="article.show">
                    <input type="text" class="form-control" v-show="isconnected" v-model="article.description" @keyup.enter="updateArticle(article)"><br/>
                    <p v-show="!isconnected">{{article.description}}</p>
                    <div class="ingredients">
                        <h4>Liste des ingrédients requis :</h4>
                        <ul>
                            <li v-for="ingredient in article.ingredients">{{ ingredient }}</li>
                        </ul>
                    </div>
                    <button class="red" v-on:click="showDescription(article, false)">Fermer la recette</button>
                </div>
                <div v-else>
                    <button class="blue" v-on:click="showDescription(article, true)">Voir la recette</button>
                </div>
                <span v-show="isconnected" class="deleteButton" title="Supprimer cette recette ?" v-on:click="deleteArticle(article.id)">X</span>
            </div>
        </div>


        <div v-show="articles.length==0">


            <p>
                <strong>Aucun article</strong>
                <br/>Il n'y a aucun article ...
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
                isconnected: false
            }

        },

        created: function () {

            this.fetchArticle();

            this.listenToEvents();

        },


        methods: {

            showDescription(article, status) {
                article.show = status;
                console.log(JSON.parse(JSON.stringify(article)));
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
                        console.log(JSON.parse(JSON.stringify(this.articles)));
                        for(var i=0; i<this.articles.length; i++) {
                            this.articles[i].show = false;
                        }
                    } catch (err) {
                        console.log(err)
                    }
                    
                });

            },

            updateArticle(article) {

                let uri = '/update/' + article.title;
                var bodyFormData = new FormData();
                bodyFormData.set('title', article.title);
                bodyFormData.set('description', article.description);
                bodyFormData.append('file', article.file);
                axios.post(uri, article).then((response) => {

                    console.log(response);

                }).catch((error) => {

                    console.log(error);

                })

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
                    console.log("show connected3 : " + this.isconnected)
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
