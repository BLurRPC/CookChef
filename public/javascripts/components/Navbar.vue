<template>
    <div class="navbar">
          <a class="title" @click="handleIndex()">CookChef</a>
          <a @click="handleAbout()">Qui sommes-nous ?</a>
          <div class="topnav-right">
            <a v-show="!isconnected" @click="handleLogin()">Se connecter</a>
            <a v-show="isconnected">Vous êtes connecté</a>
            <a v-show="isconnected" @click="handleLogout()">Se déconnecter</a>
          </div>
      </div>
</template>

<script>
  import axios from 'axios';
  import bus from "./../bus.js";
  export default {
  
    name: 'navbar',
  
    data() {
  
      return {
        login: false,
        isconnected: false,
        showabout: false
      }
  
    },

    created: function () {
        this.listenToEvents();
        this.$emit('signallogin', this.login)
        this.$emit('signalabout', this.showabout)
    },

    methods: {
      handleAbout() {
        this.showabout=true
        this.$emit('signalabout', this.showabout)
      },
      handleIndex() {
        this.showabout=false
        this.$emit('signalabout', this.showabout)
      },
      handleLogin() {
        this.login = !this.login
        this.$emit('signallogin', this.login)
      },
      handleLogout() {
        this.login = false
        this.isconnected = false
        let url = '/logout';
        axios.get(url).catch((error) => {
					console.log(error);
        })
        bus.$emit("loggedin", false);
      },

      listenToEvents() {
        bus.$on('loggedin', ($event) => {
          this.isconnected = $event;
        })
      }
    }
  }
</script>