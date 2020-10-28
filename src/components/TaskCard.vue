<template>
  <b-card bg-variant="light" :title="booking" align="left">
    <b-card-text>
      <b-row>
        <b-col cols="12">
          {{ formatDateRange(bookingStart, bookingEnd) }}
        </b-col>
        <b-col cols="12">Co-Booker(s) : {{ coBookers.join(", ") }}</b-col>
        <b-col class="text-right pt-2">
          <b-button
            :variant="getBtnClass(status)"
            v-on:click.prevent="accept($event, status)"
            :data-booking="booking"
            :data-booking_time="formatDateRange(bookingStart, bookingEnd)"
          >
            {{ STATUS[status] }}
          </b-button>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    booking: String,
    coBookers: Array,
    bookingStart: Date,
    bookingEnd: Date,
    status: String,
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
  methods: {
    accept: function(evt, status) {
      console.log(evt.target.dataset);
      let booking = evt.target.dataset.booking;
      let bookingTime = evt.target.dataset.booking_time;
      switch (status) {
        case "A":
          alert(
            `Booking for ${booking}, ${bookingTime} has already been accepted`
          );
          break;
        case "TBC":
          alert(`Accepting Booking for ${booking}, ${bookingTime}`);
          break;
        default:
          alert(
            `Booking for ${booking}, ${bookingTime} needs to be confirmed by co-booker(s)`
          );
          break;
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
