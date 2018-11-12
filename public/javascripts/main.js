'use strict'

import Vue from 'vue'

import MyFooter from './components/MyFooter.vue'
import Recette from './components/Recette.vue'
import Navbar from './components/Navbar.vue'

Vue.component('myfooter', MyFooter)
Vue.component('navbar', Navbar)
new Vue({
  el: '#app',
  created: function () {
    console.log('created')
  },
  components: {Recette},
  methods: {}
})