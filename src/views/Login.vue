<template>
  <div class="app">
    <div class="padding-top-60">
      <h5>MeetingGoWhere</h5>
      <div id="firebase-container"></div>
    </div>
    
    
    
  </div>
</template>

<script>
import app from "../firebase.service.js";
import "firebaseui/dist/firebaseui.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";


export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // this.Login();
    let uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.default.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };

    if (firebaseui.auth.AuthUI.getInstance()) {
      let ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebase-container", uiConfig);
    } else {
      let ui = new firebaseui.auth.AuthUI(app.auth());
      ui.start("#firebase-container", uiConfig);
    }
    
  },
};
</script>

<style lang="scss" scoped>
.padding-top-60 {
  padding-top: 60px;
}
</style>
