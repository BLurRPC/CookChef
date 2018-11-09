<template>
    <div>
        <div class="main" v-show="articles.length>0">
            <h3>Tous les articles</h3>
            <div class="main container" v-for="article in articles" :key="article.title">
                
                    
                    <h1 class="main h1">{{article.title}}</h1>
                    <img :src="article.picturePath" @error="ErrorImage(article.picturePath)"><br/>

                    <span title="Delete article?" v-on:click="deleteArticle(article.title)">X</span>
                <div class="main button" v-if="article.show">
                        <input type="text" class="form-control" v-model="article.description" @keyup.enter="updateArticle(article)"><br/>
                        <button v-on:click="showDescription(article, false)">Close the description</button>
                </div>
                <div v-else class="main button">
                    <button v-on:click="showDescription(article, true)">Open the description</button>
                </div>
            </div>

        </div>


        <div v-show="articles.length==0">


            <p>
                <strong>Aucun article</strong>
                <br/>Il n'y a aucun article ....</p>

        </div>


    </div>
</template>

<script>
    import axios from 'axios';

    import bus from './../bus.js'


    export default {

        data() {

            return {
                articles: []
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

                let uri = '/api/all';

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

                let uri = '/api/update/' + article.title;
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

                let uri = '/api/delete/' + id;

                axios.get(uri);

                this.fetchArticle();

            },

            listenToEvents() {

                bus.$on('refreshArticle', ($event) => {

                    this.fetchArticle(); //update article

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
