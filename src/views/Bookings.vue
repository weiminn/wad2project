<template>
 <b-container fluid>
     <b-jumbotron>
         <h1>Your Bookings </h1>
     </b-jumbotron>

     <b-table striped hover outlined :items="bookings" :fields="fields" v-if="bookings.length > 0 " responsive="lg" ref="bookingTable" stacked="md">
        <template #cell(actions)="row">
          <b-button size="sm" @click="Delete(row.item, row.index, $event.target)" class="m-1 btn btn-danger">
            Delete
          </b-button>
          <b-button size="sm" @click="row.toggleDetails" class="m-1">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>

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

                <b-col sm="12"  md="6"  class="text-sm-center">
                  <b>Booking Status </b>
                </b-col>
                <b-col sm="12" md="6" class="text-sm-center">
                  
                  {{getbookingstatus(row.item.status)}}
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

              <!-- <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button> -->
          </b-card>
         </template>

         <template #cell(booker)="row">
            {{coBookerMap[row.item.booker]}}
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
import moment from "moment";

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
          {
            key : 'booker',
            label : 'Booker'
          },
          'booking',
          'bookingStart',
          'bookingEnd',
          'credits',
          {
              key: 'actions',
              label: 'Actions'
          }
      ]
            
    };
  },

  methods: {
 getbookingstatus(status) {
     let s ="";
       switch (status) {
        case "A":
          s ="Accepted"
          break;
        case "P":
          s ="Pending"
          break;
        default:
          break;
       
       }
        return s 
 },

   Delete(item, index, button){
      // console.log(item);

      // console.log(index);
      console.log(button);

      if (item.booker == this.userID){
        let booking = bookingRef.child(item.id);
        booking.remove()
        let credits = Math.ceil(item.credits / (Object.keys(item.coBookers).length + 1 ))

        let userIDs = Object.keys(item.coBookers);
        userIDs.push(item.booker)

        userIDs.map(async (val) => {
          let userInfo = await userRef.child(val).once("value").then(function(snapshot) {
              let data = snapshot.val();
              return data
          }).then(res => {return res})

          userRef.child(val).update({...userInfo, credits : userInfo.credits + credits});
        })

        this.bookings.splice(index,1);
      }else{
        alert("Only booker can delete")
      }
      
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
                coBookerIDs[val.booker] = true;
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
            let bookingStart = moment(val.bookingStart, "MM-DD-YYYY, hh:mm:ss A")
            let today = moment(new Date())
            return bookingStart.diff(today) > 0;
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
