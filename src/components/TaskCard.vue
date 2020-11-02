<template>
  <b-card bg-variant="light" :title="booking" align="left">
    <b-card-text>
      <b-row>
        <b-col cols="12">
          {{ formatDateRange(bookingStart, bookingEnd) }}
        </b-col>
        <b-col cols="12">Co-Booker(s) : {{ loadCoBookers(coBookers) }}</b-col>
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
        TBC: "To Be Confirmed",
      },
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
    coBookers: function() {
      return this.bookingDetails.coBookers;
    },
    booking: function() {
      return this.bookingDetails.booking;
    },
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
        case "TBC":
          alert(`Accepting Booking for ${booking}, ${bookingTime}`);
          this.$set(details, "status", "A");
          var data = Object.keys(details).reduce((object, key) => {
            if (key !== "id") {
              object[key] = details[key];
            }
            return object;
          }, {});

          bookingsRef.child(details.id).update(data);
          break;
        default:
          alert(
            `Booking for ${booking}, ${bookingTime} needs to be confirmed by co-booker(s)`
          );
          break;
      }
    },
    isDisabled: function(status) {
      switch (status) {
        case "A":
          return true;
        case "TBC":
          return false;
        default:
          return false;
      }
    },

    getBtnClass: function(status) {
      switch (status) {
        case "A":
          return "outline-success";
        case "TBC":
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
        return `${start.toLocaleString(
          [],
          DateTimeOpt
        )} - ${end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}`;
      } else {
        return `${start.toLocaleString([], DateTimeOpt)} - ${end.toLocaleString(
          [],
          DateTimeOpt
        )}`;
      }
    },

    loadCoBookers: function(coBookers) {
      // console.log(coBookers)

      return coBookers.join(", ");
    },
  },
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
