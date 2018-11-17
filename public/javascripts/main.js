'use strict'

import Vue from 'vue'

import MyFooter from './components/MyFooter.vue'
import Recette from './components/Recette.vue'
import Navbar from './components/Navbar.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import axios from 'axios';
import bus from "./bus.js";

Vue.component('myfooter', MyFooter)
Vue.component('navbar', Navbar)
Vue.component('about', About)
Vue.component('login', Login)
new Vue({
  el: '#app',
  created: function () {
    console.log('created');
    this.listenToEvents();
    this.checkIfLogged();
  },
  components: {Recette},
  data: {
    showabout: false,
    showlogin: false
  },

  methods: {
    handleAbout(enable) {
      this.showabout = enable;
    },
    handleLogin(enable) {
      this.showlogin = enable;
    },
    checkIfLogged(){
      axios.get('/sessionStatus')
          .then(response => {
            console.log(response)
            if(response.data == "admin") {
              bus.$emit("loggedin", true)
            }
          })
          .catch(error => {
            console.log("error")
          });
    },
    listenToEvents() {
      bus.$on('loggedin', ($event) => {
        if($event == true){this.showlogin = false;}
     })
   }
  }
})