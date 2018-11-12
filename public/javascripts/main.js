'use strict'

import Vue from 'vue'

import MyFooter from './components/MyFooter.vue'
import Recette from './components/Recette.vue'
import Navbar from './components/Navbar.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'

Vue.component('myfooter', MyFooter)
Vue.component('navbar', Navbar)
Vue.component('about', About)
Vue.component('login', Login)
new Vue({
  el: '#app',
  created: function () {
    console.log('created')
  },
  components: {Recette},
  data: {
    showabout: false
  },

  methods: {
    handleAbout(enable) {
      console.log("ca marche")
      this.showabout = enable;
      console.log(enable)
      console.log(this.showabout)
    }
  }
})