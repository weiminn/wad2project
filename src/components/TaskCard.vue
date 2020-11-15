<template>
    <b-card v-if="isFetched" bg-variant="light" :title="booking" align="left">
      <b-card-text>
        <b-row>
          <b-col cols="12">
            {{ formatDateRange(bookingStart, bookingEnd) }}
          </b-col>
          <b-col cols="12">Booker : {{ booker_name }}</b-col>
          <b-col cols="12">Co-Booker(s) : {{ coBookers_names.join(", ") }}</b-col>
          <b-col class="text-right pt-2">
            <b-button
              :variant="getBtnClass(status)"
              v-on:click.prevent="accept($event, bookingDetails)"
              :data-booking="booking"
              :data-booking_time="formatDateRange(bookingStart, bookingEnd)"
              :disabled="isDisabled(bookingDetails.status.toUpperCase())"
            >
              {{ STATUS[status.toUpperCase()] }}
            </b-button>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
</template>

<script>
import app from "../firebase.service.js";
import moment from "moment";

const db = app.database();
const bookingsRef = db.ref("booking");
const userRef = db.ref("user");

export default {
  name: "Card",
  props: {
    bookingDetails: Object,
    coBookerMap: Object
  },
  data() {
    return {
      STATUS: {
        P: "Accept Confirmation",
        A: "Accepted",
      },
      coBookers: this.bookingDetails.coBookers,
      booker: this.bookingDetails.booker,
      coBookers_names: null,
      booker_name: null,
    };
  },
  computed: {
    bookingStart: function() {
      return this.bookingDetails.bookingStart;
    },
    bookingEnd: function() {
      return this.bookingDetails.bookingEnd;
    },
    status: function() {
      return this.bookingDetails.status.toUpperCase();
    },
    booking: function() {
      return this.bookingDetails.booking;
    },
    isFetched : function(){
      return this.coBookers_names != null && this.booker_name != null
    }
  },
  methods: {
    accept: async function(evt, details) {
      let booking = evt.target.dataset.booking;
      let bookingTime = evt.target.dataset.booking_time;
      switch (this.status) {
        case "A":
          alert(
            `Booking for ${booking}, ${bookingTime} has already been accepted`
          );
          break;
        case "P":
          alert(`Accepting Booking for ${booking}, ${bookingTime}`);
          var userInfo = this.$store.getters.getUserInfo
          var userID = userInfo.userID;
          this.$set(details.coBookers, userID, true);
          
          var status = Object.values(details.coBookers).every(v => v === true) ? 'A' : 'P'
          await this.deductCredit();

          this.$set(details, "status", status);
          

          var data = Object.keys(details).reduce((object, key) => {
            if (key !== "id") {
              object[key] = details[key];
            }
            return object;
          }, {});

          bookingsRef.child(details.id).update(data);
          
          
          break;
        default:
          break;
      }
    },

    deductCredit: async function(){
      let credits = Math.ceil(this.bookingDetails.credits / (Object.keys(this.coBookers).length + 1 ))

      let userIDs = Object.keys(this.coBookers);
      userIDs.push(this.booker)

      await Promise.all(userIDs.map(async (val) => {
        let userInfo = await userRef.child(val).once("value").then(function(snapshot) {
            let data = snapshot.val();
            return data
        }).then(res => {return res})  

        userRef.child(val).update({...userInfo, credits : userInfo.credits - credits});
      }))

      

    },
    isDisabled: function(status) {
      switch (status) {
        case "A":
          return true;
        case "P":
          return false;
        default:
          return false;
      }
    },

    getBtnClass: function(status) {
      switch (status) {
        case "A":
          return "outline-success";
        case "P":
          return "outline-info";
        default:
          return "outline-warning";
      }
    },

    formatDateRange: function(start, end) {
      let bookingStart = moment(start, "MM-DD-YYYY, hh:mm:ss A")
      let bookingEnd = moment(end, "MM-DD-YYYY, hh:mm:ss A")
      return `${bookingStart.format("DD/MM/YYYY, HH:mm").toString()} - ${bookingEnd.format("HH:mm").toString()}`

    },
  },
  async created() {
    this.coBookers_names = Object.keys(this.coBookers).map((val) => {return this.coBookerMap[val]})
    this.booker_name = await userRef.child(this.booker).once("value").then(function(snapshot){
      let data = snapshot.val();
      return data.fullName
    }).then(res => {return res})

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>