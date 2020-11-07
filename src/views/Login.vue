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
      user_email: ''
    
    };
  },
methods:{
Login(){
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "scaper65@hotmail.com",password:"vincentt" })
  };
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmZJ4B0b_XffgrNtfP6GT1Kf1yHJvbqPM", requestOptions)
    .then(response => response.json())
    .then(data =>  this.LoadUserProfile( data.localId))
  
},

LoadUserProfile(user_email){
    
    users.once("value").then((snapshot) => {
        let data = snapshot.val();
        var user = Object.values(data).filter((b) => b.email == user_email);
        console.log(user);
});

}

},
mounted(){
   this.Login(); 
}

}


</script>
