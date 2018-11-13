<template>
    <div class="navbar">
          <a @click="handleIndex()">Home</a>
          <a @click="handleAbout()">About</a>
          <div class="topnav-right">
            <a v-show="!isconnected" @click="handleLogin()">Login</a>
            <a v-show="isconnected">Connected</a>
            <a v-show="isconnected" @click="handleLogout()">Logout</a>
          </div>
      </div>
</template>

<script>
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
        console.log("signal About sent")
        this.$emit('signalabout', this.showabout)
      },
      handleIndex() {
        this.showabout=false
        console.log("signal Index sent")
        this.$emit('signalabout', this.showabout)
      },
      handleLogin() {
        console.log("signal Login sent")
        this.login = !this.login
        this.$emit('signallogin', this.login)
      },
      handleLogout() {
        console.log("Logged out")
        this.login = false
        this.isconnected = false
        bus.$emit("loggedout")
      },

      listenToEvents() {
        bus.$on('loggedin', ($event) => {
          this.isconnected = true;
          console.log("show connected : " + this.isconnected)
        })
      }
    }
  }
</script>