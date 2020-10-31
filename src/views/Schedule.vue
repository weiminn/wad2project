<template>
  <div>
    <h3>
      Room Schedules
    </h3>
    <!-- <Chart :rooms="rooms" @chartToggled="toggled($event)">
    </Chart> -->
    <vue-cal
      hide-view-selector
      :time-from="9 * 60"
      :time-step="30"
      :disable-views="['years', 'month', 'year', 'week']"
      active-view="day"
      editable-events
      :events="books"
      :split-days="daySplits"
      :min-split-width="70"
      @event-drag-create="onEventCreate"
      @event-duration-change="onEventChange"
    />
    <!-- style bookings -->

    <b-button @click="next" style="margin-top: 20px;" variant="primary">NEXT</b-button>
  </div>
</template>

<script>

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

// import router from '../router/index.js';
import app from "../firebase.service.js";

const db = app.database();
const bookingRef = db.ref("booking");

export default {
  name: "Schedule",
  components: {
    // Chart
    VueCal
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      from: 1000,
      to: 1500,
      roomsToRetrieve: [
          "SIS GSR 2-1",
          "SIS GSR 2-2",
          "SIS GSR 2-3",
          "SIS GSR 2-4",
      ],
      selected: null,
      books: [],
      daySplits: []
    };
  },
  methods: {
    async fetchData() {
      //display rooms
        for (let index = 1; index <= this.roomsToRetrieve.length; index++) {
            this.daySplits.push({
                id: index,
                label: this.roomsToRetrieve[index-1]
            });
        }

      //retrieve bookings for particular date and rooms
      bookingRef.once("value").then((snapshot) => {
        let data = snapshot.val();
        var _books = Object.values(data).filter((b) => 
            (new Date(Date.parse(b.bookingStart))).getDate().toString() == (new Date()).getDate().toString() &&
            (new Date(Date.parse(b.bookingStart))).getMonth().toString() == (new Date()).getMonth().toString() &&
            (new Date(Date.parse(b.bookingStart))).getFullYear().toString() == (new Date()).getFullYear().toString()
        );
        // console.log("filtered: " + _books.length)

        // populate bookings for the rooms
        _books.forEach(b => {
            for (const s of this.daySplits) {
                // console.log('checking: ' + s.id + " " + s.label + " with " + b.booking);
                if(s.label == b.booking) {
                    b.split = s.id;
                };
            }
            
            b.deletable = false;
            b.resizable = false;
            this.books.push(b);
        })
      });
    },
    onEventChange: function(event) {
      console.log(event);
      console.log(this.books.length);
      

      //check if event clashes
    },
    onEventCreate: function(event) {
      this.selected = {
        bookingStart: event.start.toLocaleString(),
        bookingEnd: event.end.toLocaleString(),
        booking: this.daySplits.filter(s => s.id == event.split)[0].label
      };
    //   bookingRef.push(this.selected);

      //check if event clashes
    },
    checkClash(){

    },
    next: function() {
      //pass on the data to ama's wizard
      console.log("Sending: " + JSON.stringify(this.selected));
        this.$router.push({
            name: 'BookingForm',
            params: {
                selectedTiming: this.selected
            }
        });
    }
  }
};
</script>

<style scoped>
.vuecal_event.unavail {
  background-color: red;
}
</style>
