<template>
  <div class="app"></div>
</template>

<script>
import app from "../firebase.service.js";

const db = app.database();
const users = db.ref("user");

export default {
  data() {
    return {
      user_info: null,
    };
  },
  methods: {
    Login() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "qilin.po.2018@smu.edu.sg",
          password: "password123",
        }),
      };
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmZJ4B0b_XffgrNtfP6GT1Kf1yHJvbqPM",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          if ("localId" in data){
            this.LoadUserProfile(data.localId)
          }
          
        })
    },

    LoadUserProfile(user_id) {
      users.child(user_id).once("value").then((snapshot) => {
        let data = snapshot.val();
        this.$store.dispatch("logInUser", {userInfo: {...data, userID: user_id}, loggedInStatus: true});
        this.user_info = data;
      });
    },
  },
  mounted() {
    this.Login();
  },
};
</script>
