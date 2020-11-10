<template>
  <b-container class="custom-width">
    <h3>Update Profile</h3>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2" label-align="left">
        <b-form-input
          id="input-2"
          v-model="name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Email address:" label-for="input-1" label-align="left">
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          disabled
        ></b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-2" label="Your Credits:" label-for="input-2" label-align="left">
        <b-input-group prepend="e$" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="credit" v-model="credits" disabled></b-form-input>
        </b-input-group>
      </b-form-group>


      <b-button type="submit" variant="primary">Update</b-button>
    </b-form>

  </b-container>
</template>

<script>
import app from "../firebase.service.js";
const db = app.database();
const users = db.ref("user");


export default {
  data() {
    return {
      name: "",
      email: "",
      credits: 5000,
      userID: null
    };
  },
  methods: {
    onSubmit(){
      let formData = {fullName: this.name, credits: this.credits, email: this.email}
      this.$store.dispatch("logInUser", {userInfo: {...formData, userID : this.userID}, loggedInStatus: true});
      users.child(this.userID).update(formData);
      alert("Success... Redirecting to homepage");
      this.$router.push({name: "Home"});
    }
  },
  mounted(){
    this.userID = this.$store.state.userInfo.userID;
    this.email = this.$store.state.userInfo.email;
    
    
    users.child(this.userID).once("value").then((snapshot) => {
      
        let data = snapshot.val();
        if(data != null){
          this.name = data.fullName;
          this.credits = data.credits;
          this.email = data.email;
        }
        
      });
  }
};
</script>

<style lang="scss" scoped>

  $breakpoint-tablet: 768px;
  .custom-width {
    width: 50%;
  }

  @media only screen and (max-width: $breakpoint-tablet) {
    .custom-width {
      width: 95%;
    }
  }
</style>


