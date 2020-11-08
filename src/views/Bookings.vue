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

           let dataFormatted = Object.values(data).map((val,index) => {
            if (val != null){
              if("coBookers" in val && val.coBookers.includes(  user.userID)){
                return {...val, status: val.status.toUpperCase(), id: keys[index]}
              }
            }
          })

          dataFormatted = dataFormatted.filter(val => {
            return val != null
          })

            dataFormatted = dataFormatted.filter(val => {
            return val.status != "P" 
          })

             dataFormatted = dataFormatted.filter(val => {
            return val.status != "p" 
          })

          console.log(dataFormatted)



          return dataFormatted
      }).then(res => {return res})

        this.bookings = data;
    }
  }
       
    
  
              
  
      
  }
</script>

