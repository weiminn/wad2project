<template>
  <div id="app">
    <Header id="nav"/>
    
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  name: "App",
  beforeCreate () {
    if (! this.$store.state.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;
}
</style>
