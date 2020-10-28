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
      :events="booked"
      :split-days="daySplits"
      @event-drag-create="onEventCreate"
    />
    <!-- style bookings -->

    <b-button style="margin-top: 20px;" variant="primary">NEXT</b-button>
  </div>
</template>

<script>
// import Chart from "@/components/Chart.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
// import axios from "axios";

import app from "../firebase.service.js";

const db = app.database();
const bookingsRef = db.ref("booking");

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
      selectedRoom: null,
      rooms: [
        {
          id: "SIS 3-24",
          building: "SIS",
          type: "GSR",
          level: "3",
          unit: "24",
          timeslots_available: {
            "1000~1029": true,
            "1030~1059": true
          },
          timeslots_selected: {
            "1000~1029": true,
            "1030~1059": true
          }
        }
      ],

      booked: [
        {
          start: "2020-10-28 10:30",
          end: "2020-10-28 11:40",
          class: "unavail",
          background: true,
          deletable: false, // optional - force undeletable when events are editable.
          resizable: false,
          split: 1
        }
        // {
        //     start: '2020-10-28 13:00',
        //     end: '2020-10-28 14:10',
        //     class: 'unavail',
        //     background: true,
        //     deletable: false, // optional - force undeletable when events are editable.
        //     resizable: false,
        //     split: 2
        // },
      ],
      daySplits: [
        {
          id: 1,
          label: "1"
        },
        {
          id: 2,
          label: "2"
        }
      ]
    };
  },
  methods: {
    async fetchData() {
        
        //display rooms 

        //retrieve bookings for particular date and rooms

      bookingsRef.once("value").then(function(snapshot) {
          let data = snapshot.val();
          console.log(data);

          //populate bookings for the rooms

      })
    },
    onEventCreate: function(event) {
      console.log(event);
      console.log(this.booked.length);
      console.log(event.start);
      console.log(event.end);
      return event;

      //check if event clashes

    }, 
    next: function(){
        //pass on the data to ama's wizard
    }
  }
};
</script>

<style scoped>
.vuecal_event.unavail {
  background-color: red;
}
</style>
