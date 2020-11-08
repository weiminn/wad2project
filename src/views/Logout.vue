<template>
  <div class="app">
  </div>
</template>

<script>
import app from "../firebase.service.js";
import "firebase/auth";


export default {
  data() {
    return {};
  },
  methods: {},
  beforeCreate () {
    app.auth().signOut();
    this.$store.dispatch("logOutUser", {userInfo: null, loggedInStatus: false});
  },
};
</script>
