<template>
  <div>
    <h3>
      Room Schedules
    </h3>
    <!-- <Chart :rooms="rooms" @chartToggled="toggled($event)">
    </Chart> -->
    <vue-cal
        hide-view-selector
        :time-from="9 * 60" :time-step="30"
        :disable-views="['years', 'month', 'year', 'week']"
        active-view='day'
        editable-events
        :events="events"
        :split-days="daySplits"
        @event-drag-create="onEventCreate"
    />

    <b-button style="margin-top: 20px;" variant="primary">NEXT</b-button>
  </div>
</template>

<script>
// import Chart from "@/components/Chart.vue";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

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
        rooms: 
        [
            {
                id: "SIS 3-24",
                building: "SIS",
                type: "GSR",
                level: "3",
                unit: "24",
                timeslots_available: {
                    "1000~1029": true,
                    "1030~1059": true,
                }, 
                timeslots_selected: {
                    "1000~1029": true,
                    "1030~1059": true,
                }
            }
            
        ]
    
        ,
        events: [
            {
                start: '2020-10-28 10:30',
                end: '2020-10-28 11:40',
                class: 'unavail',
                background: true,
                deletable: false, // optional - force undeletable when events are editable.
                resizable: false,
                split: 1
            },
            {
                start: '2020-10-28 13:00',
                end: '2020-10-28 14:10',
                class: 'unavail',
                background: true,
                deletable: false, // optional - force undeletable when events are editable.
                resizable: false,
                split: 2
            },

        ],
        daySplits:[
            {
                'id': 1,
                'label': '1'
            },
            {
                'id': 2,
                'label': '2'
            }
        ]
    };
  },
  methods: {
    async fetchData() {},
    onEventCreate: function(event) {
        // var startHour = (event.startTimeMinutes/60).toFixed(0);
        // if(startHour.toString().length == 1){
        //     startHour = "0" + startHour;
        // }
        // var startMinute = (event.startTimeMinutes%60).toFixed(0);
        // if(startMinute.toString().length == 1){
        //     startMinute = "0" + startMinute;
        // }

        // var endHour = (event.endTimeMinutes/60).toFixed(0);
        // if(endHour.toString().length == 1){
        //     endHour = "0" + endHour;
        // }
        // var endMinute = (event.endTimeMinutes%60).toFixed(0);
        // if(endMinute.toString().length == 1){
        //     endMinute = "0" + endMinute;
        // }


        console.log(event);
        console.log(this.events.length);
        console.log(event.start);
        console.log(event.end);
        return event;
    },
    // deleteEventFunction: function(){

    // }
    // toggled: function(event){
    //     console.log(event);
    //     if(!this.$data.selectedRoom){
    //         this.$data.selectedRoom = event.id;
    //     } else{
    //         if(this.$data.selectedRoom != event.id){
    //             var toDeselect = this.$data.rooms.find((room => room.id == this.$data.selectedRoom)).timeslots_selected;
    //             for(var slot in toDeselect){
    //             toDeselect[slot] = false;
    //             }            
    //             this.$data.selectedRoom = event.id;
    //         }
    //     }
    //     this.$data.rooms.find(room => room.id == event.id).timeslots_selected[event.t] = event.s;
    //     console.log(this.$data.rooms.find(room => room.id == event.id).timeslots_selected);
    //   }
  }
};
</script>

<style scoped>
    .vuecal_event.unavail {
        background-color: red;
    }
</style>
