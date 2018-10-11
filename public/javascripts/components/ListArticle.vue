<template>
    <div>

        <div class="col-md-12" v-show="articles.length>0">

            <h3>Article Items</h3>

            <div class="row mrb-10" v-for="article in articles">

                <div class="input-group m-b-5">

                    <span class="input-group-addon addon-right">
                        <input type="checkbox" v-model="article.done"
                               :checked="article.done" :value="article.done"
                               v-on:change="updateArticle(article)"
                               title="Mark as done?"/></span>

                    <input type="text" class="form-control" :class="article.done?'article__done':''" v-model="article.title"
                           @keypress="article.editing=true" @keyup.enter="updateArticle(article)">

                    <span class="input-group-addon addon-left" title="Delete article?"
                          v-on:click="deleteArticle(article._id)">X</span>

                </div>

                <span class="help-block small" v-show="article.editing">Hit enter to update</span>

            </div>

        </div>


        <div class="row alert alert-info text-center" v-show="articles.length==0">


            <p class="alert alert-info">
                <strong>All Caught Up</strong>
                <br/>
                You do not have any article items</p>

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

            fetchArticle() {

                let uri = 'http://localhost:4000/api/all';

                axios.get(uri).then((response) => {

                    this.articles = response.data;

                });

            },

            updateArticle(article) {

                let id = article._id;

                let uri = 'http://localhost:4000/api/update/' + id;

                article.editing = false;

                axios.post(uri, article).then((response) => {

                    console.log(response);

                }).catch((error) => {

                    console.log(error);

                })

            },


            deleteArticle(id) {

                let uri = 'http://localhost:4000/api/delete/' + id;

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
