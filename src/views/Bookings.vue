<template>
 <b-container fluid>
     <b-jumbotron>
         <h1>Your Bookings </h1>
     </b-jumbotron>

     <b-table striped hover outlined :items="bookings" :fields="fields" v-if="bookings.length > 0 " responsive="lg"
         ref="bookingTable" stacked="md">


         <template #row-details="row">
             <b-card>
                 <b-row class="mb-2 col-md-12">
                    <b-col sm="12" md="6" class="text-sm-center">
                        <b>Cobookers</b>
                        
                        
                    </b-col>
                    <b-col sm="12" md="6" class="text-sm-center">
                      <div v-for="cobooker in Object.keys(row.item.coBookers)"  v-bind:key="cobooker">
                        {{coBookerMap[cobooker]}}
                      </div>
                    </b-col>


                    
                 
                 </b-row>
                 <b-row class="mb-2 col-md-12">

                    <b-col sm="12" md="6" class="text-sm-center">
                        <b>Purpose</b>

                    </b-col>
                    <b-col sm="12" md="6" class="text-sm-center">
                        <div>
                          {{row.item.purpose}}
                        </div>
                    </b-col>
                 
                 </b-row>
                 <b-row class="mb-2 col-md-12">

                    <b-col sm="12"  md="6"  class="text-sm-center">
                      <b>Resource Links</b>
                    </b-col>
                    <b-col sm="12" md="6" class="text-sm-center">
                      <div v-for="link in row.item.resourceLinks" v-bind:key="link.URL">
                        {{link["URL"]}}
                      </div>
                      <div v-if="row.item.resourceLinks == null"> - </div>
                    </b-col>
                 
                 </b-row>
                 <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
             </b-card>
         </template>

         <template #cell(actions)="row">
             <b-button size="sm" @click="Delete(row.item, row.index, $event.target)" class="btn btn-danger">
                 Delete
             </b-button>
             <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                 {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
             </b-button>
         </template>
     </b-table>

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
const userRef = db.ref("user");

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
      coBookerMap: null,
      fields: [
          'booking',
          'bookingStart',
          'bookingEnd',
          'purpose',
          {
              key: 'actions',
              label: 'Actions'
          }
      ]
            
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

      let coBookerIDs ={};
      let data = await bookingRef.once("value").then(function(snapshot) {
          let data = snapshot.val();
          let keys = Object.keys(data);
          let dataFormatted = Object.values(data).map((val, index) => {
            if (val != null){
                
              if ("coBookers" in val && (user.userID in val.coBookers || val.booker == user.userID)){
                coBookerIDs = {...coBookerIDs, ...val.coBookers};
              }
   
              if(val.booker == user.userID || ("coBookers" in val && user.userID in val.coBookers && !val.coBookers[user.userID])){
                return {...val, status: val.status.toUpperCase(), id: keys[index]}
              }
            }
          })
        
          dataFormatted = dataFormatted.filter(val => {
            return val != null
          })
          
          dataFormatted = dataFormatted.filter(val => {
            return new Date(val.bookingStart) > new Date();
          })

          // console.log(dataFormatted[0].resourceLinks)
          
          Object.keys(coBookerIDs).forEach(async (val)=>{ 

            let fullName = await userRef.child(val).once("value").then(function(snapshot) {
              let data = snapshot.val();
              return data.fullName
            }).then(res => {return res})  
            console.log(fullName);
            coBookerIDs[val] = fullName;

            
          });
          console.log(dataFormatted);
      
          return dataFormatted
      }).then(res => {return res})
      

      this.coBookerMap = coBookerIDs;

      this.bookings = data;
        
    }
  }
       
  }
</script>
<style lang="stylus">
.table td, .table th{
    width :100%;
       padding: .3rem;
}


</style>
