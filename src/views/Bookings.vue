<template>

<b-container> 
<b-jumbotron><h1>Your Bookings </h1></b-jumbotron> 
<b-row v-if="bookings.length >0 ">
  <b-col sm="12" md="6" lg="4" v-for="booking in this.bookings" :key="booking.id" >
          <BookingCard
          :bookingDetails="booking"
        />
      </b-col>
</b-row>

<b-row v-if="bookings.length == 0">
    <b-col sm="12" md="12">
         <h3 class="mx-auto"> No bookings available! <a href="/">Create</a> a booking maybe?</h3>
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
      this.userID = this.user.userID;
     
      this.loadBookings(bookingRef,this.user);
    },
  components: {
    BookingCard,
    
  },
  data() {
    
  return {
      bookings: {},
      user:Object,
     
    };
  },
  methods: {
   async loadBookings(bookingRef,user){
      // bookingRef.once("value").then((snapshot) => {
      //   let data = snapshot.val();
      //   this.bookings = Object.values(data).filter((b) => (b.booker = this.user.userID)).filter((b) => (b.status != 'p'));
       
      // });


      let data = await bookingRef.once("value").then(function(snapshot) {
          let data = snapshot.val();
          let keys = Object.keys(data);

          let dataFormatted = Object.values(data).map((val, index) => {
            if (val != null){
              if("coBookers" in val && user.userID in val.coBookers && !val.coBookers[user.userID]){
                return {...val, status: val.status.toUpperCase(), id: keys[index]}
              }
            }
          })

          dataFormatted = dataFormatted.filter(val => {
            return val != null
          })
        //   .filter(val => {
        //     return new Date(val.bookingEnd).getTime() > new Date().getTime()
        //   })
          .filter(val => {
            return val.status != "P" 
          }).filter(val => {
            return val.status != "p" 
          })
        //   console.log(dataFormatted)
          return dataFormatted
      }).then(res => {return res})
    console.log(data)
        this.bookings = data;
    }
  }
       
  }
</script>

