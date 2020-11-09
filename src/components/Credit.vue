<template>
    
</template>

<script>
import app from "../firebase.service.js";

const db = app.database();
const users = db.ref("user");

export default {
    data() {
        return {
            bookings: {},
            user: Object,

        };
    },
    methods:{
        Deduct:function(uuid, credit_amt){
             users.once("value").then((snapshot) => {
                 let data = snapshot.val();
                 this.bookings = Object.values(data).filter((b) => (b.booker = this.user.userID)).filter((b) => (b.status != 'p'));

             });
        },
        Add:function(){

        }

    }
}

</script>