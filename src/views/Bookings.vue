<template>

<b-container> 
<b-jumbotron><h1>Your Bookings</h1></b-jumbotron> 
<b-row>
  <b-col sm="12" md="6" lg="4" v-for="booking in this.bookings" :key="booking.id">
          <BookingCard
          :bookingDetails="booking"
        />
      </b-col>
</b-row>
</b-container>
</template>

<script>
import BookingCard from "@/components/BookingCard";
import app from "../firebase.service.js";

const db = app.database();
const bookingRef = db.ref("booking");

export default {
    mounted(){
      this.user = this.$store.state.userInfo;
      console.log(this.user);
      this.loadBookings(bookingRef);
    },
  components: {
    BookingCard,
    
  },
  data() {
    
  return {
      bookings: {},
      user:Object
    };
  },
  methods: {
    loadBookings(bookingRef){
      bookingRef.once("value").then((snapshot) => {
        let data = snapshot.val();
        this.bookings = Object.values(data).filter((b) => (b.booker = this.user.userID));
       
      });
    }
  }
       
    
  
              
  
      
  }
</script>

