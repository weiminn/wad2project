<template>

    <b-container fluid>
        <b-jumbotron>
            <h1>Your Bookings </h1>
        </b-jumbotron>

        <b-row>
            <b-col sm="12" md="12"  sticky-header>
                <b-table striped hover outlined :items="bookings" :fields="fields" v-if="bookings.length > 0 ">
                    <template #cell(actions)="row">
                    
                        <b-button size="sm"  @click="Delete(row.item, row.index, $event.target)" class="btn btn-danger">
                         Delete
                        </b-button>
                    </template>
                </b-table>
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
import app from "../firebase.service.js";

const db = app.database();
const bookingRef = db.ref("booking");
// const userRef = db.ref("user");

export default {
    mounted(){
      this.user = this.$store.state.userInfo;
      this.userID = this.user.userID;
     
      this.loadBookings(bookingRef,this.user);
    },
  components: {
 
    
  },
  data() {
      return {
          bookings: {},
          user: Object,
          fields: [
               'booking',
                  'bookingStart',
                     'bookingEnd',
                        'purpose',
                        'coBookers',

              {
                  key: 'actions',
                  label: 'Actions'
              }]
      };
  },
  methods: {

   Delete(item, index, button){
        console.log(item);
        console.log(index);
        console.log(button);

        let booking = bookingRef.child(item.id);
        booking.remove()

       this.bookings.splice(index,1);


      //  this.bookings.filter((b)=>b.id ==item.id)
   },

   async loadBookings(bookingRef,user){
      // bookingRef.once("value").then((snapshot) => {
      //   let data = snapshot.val();
      //   this.bookings = Object.values(data).filter((b) => (b.booker = this.user.userID)).filter((b) => (b.status != 'p'));
       
      // });

    // this.coBookers_names = await Promise.all(Object.keys(this.coBookers).map(async (val) => {
    //   let fullName = await userRef.child(val).once("value").then(function(snapshot) {
    //       let data = snapshot.val();
    //       return data.fullName
    //   }).then(res => {return res})  
      
    //   return fullName
    // }))

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
     
        //   console.log(dataFormatted)
          return dataFormatted
      }).then(res => {return res})
     
           


        this.bookings = data;
    }
  }
       
  }
</script>

