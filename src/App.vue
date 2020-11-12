<template>
  <div id="app">
    <Header id="nav" />

    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";


export default {
  name: "App",
  components: {
    Header,
  },
  methods: {},
  watch: {
    $route: function(to){
      let redirectToLogin = ['/tasks', '/booking' , '/schedule', '/bookingForm', '/profile', ]
      if (redirectToLogin.includes(to.path)){
        if(! this.$store.state.isLoggedIn){
          this.$router.push({ name: "Login" });
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

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
