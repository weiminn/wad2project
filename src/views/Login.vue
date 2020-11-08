<template>
  <div class="app" style="position:relative">

    <div style="background-color:#102B72; margin-top:-30px;" class="row align-items-center" >

      <div class="container">

        <img style="width:350px;z-index: 1;position:absolute;top: 0; left: 0; bottom: 0; right: 0;margin:auto" src="@/assets/smuIcon.png" alt="">
      
        <div class="container col-10 col-sm-9 col-md-7 col-lg-5 pt-5 pb-5 shadow-lg loginContainer mx-auto d-block">

          <div>
            <h5>MeetingGoWhere</h5>
            <div id="firebase-container"></div>
          </div>

        </div>

      </div>
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
    
  }
};
</script>

<style lang="scss" scoped>

.padding-top-60 {
  padding-top: 60px;
}
.loginContainer{
  border-radius: 7.5px;
  background-color: white;
  opacity: 0.95;
  z-index: 10;
}
.row {
  height: 100vh;
}
</style>
