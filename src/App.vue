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
import app from "./firebase.service.js";
const db = app.database();
const users = db.ref("user");

export default {
  name: "App",
  beforeCreate() {
    app.auth().onAuthStateChanged((user) => {
      if (user != null) {
        if(! this.$store.state.isLoggedIn){
          this.LoadUserProfile(user.uid);
        }
      } else {
        if(this.$router.currentRoute.path != "/login"){
          this.$router.push({ name: "Login" });
        }
      }
    });

    
  },
  components: {
    Header,
  },
  methods: {
    LoadUserProfile(user_id) {
      users.child(user_id).once("value").then((snapshot) => {
        let data = snapshot.val();
        this.$store.dispatch("logInUser", {userInfo: {...data, userID: user_id}, loggedInStatus: true});
        this.user_info = data;
      });
    },
  },
  watch: {
    $route: function(to){
      let redirectToLogin = ['/tasks', '/booking' , '/schedule', '/bookingForm', '/']
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
