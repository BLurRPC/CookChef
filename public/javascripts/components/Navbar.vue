<template>
    <div class="navbar">
          <a @click="handleIndex()">Home</a>
          <a @click="handleAbout()">About</a>
          <div class="topnav-right">
            <a href="#login">Login</a>
            <a href="#register">Register</a>
          </div>
      </div>
</template>

<script>
  export default {
  
    name: 'navbar',
  
    data() {
  
      return {}
  
    },
    methods: {
      handleAbout() {
        console.log("signal sent")
        this.$emit('signalabout', true)
      },
      handleIndex() {
        console.log("signal sent")
        this.$emit('signalabout', false)
      }
    }
  }
</script>