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

const db = app.database();
const bookingsRef = db.ref("booking");
const userRef = db.ref("user");

export default {
  name: "Card",
  props: {
    bookingDetails: Object,
  },
  data() {
    return {
      STATUS: {
        P: "Pending Confimation",
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
      return new Date(this.bookingDetails.bookingStart);
    },
    bookingEnd: function() {
      return new Date(this.bookingDetails.bookingEnd);
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
    accept: function(evt, details) {
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
          this.$set(details, "status", status);
          

          var data = Object.keys(details).reduce((object, key) => {
            if (key !== "id") {
              object[key] = details[key];
            }
            return object;
          }, {});

          bookingsRef.child(details.id).update(data);
          this.$router.go()
          break;
        default:
          break;
      }
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
      let DateTimeOpt = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      if (start.toDateString() == end.toDateString()) {
        return `${start.toLocaleString([],DateTimeOpt)} - ${end.toLocaleTimeString([], {hour: "numeric", minute: "numeric", hour12: false})}`;
      } else {
        return `${start.toLocaleString([], DateTimeOpt)} - ${end.toLocaleString([],DateTimeOpt)}`;
      }
    },
  },
  async created() {
    this.coBookers_names = await Promise.all(Object.keys(this.coBookers).map(async (val) => {
      let fullName = await userRef.child(val).once("value").then(function(snapshot) {
          let data = snapshot.val();
          return data.fullName
      }).then(res => {return res})  
      
      return fullName
    }))

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
