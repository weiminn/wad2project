<template>
    <div>
        
        <h3>
            Facility Booking
        </h3>
        
        <vue-cal
            class="scrollable vuecal--full-height-delete"
            hide-view-selector
            :time-from="tFrom * 60"
            :time-to="tTo * 60"
            :time-step="30"
            :disable-views="['years', 'month', 'year', 'week']"
            active-view="day"
            :editable-events="params"
            :events="books"
            :split-days="daySplits"
            :sticky-split-labels="true"
            :min-split-width="130"
            :snap-to-time="30"
            @event-drag-create="onEventCreate"
            @event-duration-change="onEventChange"
            @event-delete="onEventDelete"
            >
        </vue-cal>
        <!-- style bookings -->

        <div class="row d-flex justify-content-between" style="margin: 20px 20px 0 20px">
            <!-- <div class="col"> -->
                <b-button class="col-sm-3" style="margin-bottom:15px;width:100px;" @click="back">Back</b-button>
            <!-- </div> -->
            <!-- <div class="col"> -->
                <b-button class="col-sm-3" style="margin-bottom:15px;width:100px;" @click="next" variant="primary">Next</b-button>
            <!-- </div> -->
        </div>

        <b-modal ref="my-modal" hide-footer title="Invalid Timing">
            <div class="d-block text-center">
                <ul>
                    <li>You may select one and only continuous slot.</li>
                    <li>You can only select slots on the chosen day</li>
                    <li>Selected slot cannot start before current time of the day.</li>
                    <li>Selected slot cannot conflict with other booked slot(s).</li>
                </ul>
            </div>
            <!-- <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Hide</b-button> -->
        </b-modal>
    </div>
</template>

<script>

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

// import router from '../router/index.js';
import app from "../firebase.service.js";

const db = app.database();
const bookingRef = db.ref("bookingsWM");
// const roomRef = db.ref("school");
// const storage = app.storage();

export default {
    name: "Schedule",
    components: {
        // Chart
        VueCal
    },
    mounted() {
        if(this.$route.params.data) {
            // this.tFrom = (new Date(this.$route.params.data.fromDateTime)).getHours();
            // this.tTo = (new Date(this.$route.params.data.toDateTime)).getHours();
            this.roomsToRetrieve = this.$route.params.data.selectedFacilities;
        }
        this.fetchData();
    },
    data() {
        return {
            tFrom: 8,
            tTo: 22.5,
            links: [],
            roomsToRetrieve: [],
            selectedArr: [],
            selectedEvent: null,
            books: [],
            daySplits: [],
            params:{ title: false, drag: false, resize: true, delete: true, create: true }
        };
    },
    methods: {
        async fetchData() {
        //display rooms
            for (let index = 1; index <= this.roomsToRetrieve.length; index++) {
                this.daySplits.push({
                    id: index,
                    label: this.roomsToRetrieve[index-1],
                    class: "room"
                });
            }

        //retrieve bookings for particular date and rooms
        bookingRef.once("value").then((snapshot) => {
            let data = snapshot.val();
            // console.log(data);
            var _books = Object.values(data).filter((b) => 
                (new Date(Date.parse(b.bookingStart))).getDate().toString() == (new Date()).getDate().toString() &&
                (new Date(Date.parse(b.bookingStart))).getMonth().toString() == (new Date()).getMonth().toString() &&
                (new Date(Date.parse(b.bookingStart))).getFullYear().toString() == (new Date()).getFullYear().toString()
            );
            // console.log("filtered: " + _books.length);
            // console.log(_books);

            // populate bookings for the rooms
            _books.forEach(b => {
                for (const s of this.daySplits) {
                    // console.log('checking: ' + s.id + " " + s.label + " with " + b.booking);
                    if(s.label == b.booking) {
                        b.split = s.id;
                    };
                }

                b.start = b.bookingStart;
                b.end = b.bookingEnd;
                b.class = "unavail";
                
                b.deletable = false;
                b.resizable = false;
                
                this.books.push(b);
            })

            // this.levels.forEach(level => {
            //     roomRef.child(this.building).child(level).once('value', snap => {
            //         storage.ref(snap.val().path).getDownloadURL().then(u => {
            //             this.links.push({
            //                 building: this.building,
            //                 level: level,
            //                 url: u
            //             });
            //         });
            //     });
            // })

            // console.log(this.links);
        });
        },
        onEventChange: function(event) {
            console.log(event);
            console.log(this.selectedArr.length);
        },
        onEventCreate: function(event) {
            this.selectedArr.push(event);
            this.params.create = false;
        },
        onEventDelete: function(event) {
            this.selectedArr = this.selectedArr.filter(e => e._eid !== event._eid);
            this.params.create = true;
        },
        checkClash(cb){
            var clear = true;
            if (new Date(this.selectedArr[0].start) < new Date()){
                cb(false);
                return;
            }

            if (
                (new Date(this.selectedArr[0].start)).getFullYear() < (new Date()).getFullYear() &&
                (new Date(this.selectedArr[0].start)).getMonth() < (new Date()).getMonth() &&
                (new Date(this.selectedArr[0].start)).getDate() < (new Date()).getDate()
                ){
                cb(false);
                return;
            }

            for (var index = 0; index < this.books.length; index++) {
                console.log("loopin'");
                if(this.books[index].split == this.selectedArr[0].split){
                    if (
                        ((new Date(this.selectedArr[0].start)) <= (new Date(this.books[index].start)) && 
                        (new Date(this.selectedArr[0].end)) <= (new Date(this.books[index].start)))
                        ||
                        ((new Date(this.selectedArr[0].start)) >= (new Date(this.books[index].end)) && 
                        (new Date(this.selectedArr[0].end)) >= (new Date(this.books[index].end)))
                        ) {
                            //all clear
                            console.log("clear for " + index);
                    } else {
                        clear = false;
                        break;
                    }      
                }
                if(index == this.books.length-1){
                    console.log("Ended Loop");
                    cb(clear);
                }
            }

            if(this.books.length == 0) {
                cb(true);
            }
        },
        next: function() {
            if(this.selectedArr.length == 1){
                this.checkClash((clear) => {
                    if(clear){
                        console.log("Sending: " + this.selectedArr[0]);
                        // pass on the data to ama's wizard
                        this.$router.push({
                            name: 'BookingForm',
                            params: {
                                selectedTiming: {
                                    bookingStart: this.selectedArr[0].start.toLocaleString(),
                                    bookingEnd: this.selectedArr[0].end.toLocaleString(),
                                    booking: this.daySplits.filter(s => s.id == this.selectedArr[0].split)[0].label
                                }
                            }
                        });
                    } else {
                        console.log("Invalid Timing!");
                        this.showModal()
                    }
                })                
            } else {
                this.showModal()
                console.log("Please select one and only continuous slot.");
            }
        },
        back() {
            this.$router.push({
                name: "Home"
            });
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            // We pass the ID of the button that we want to return focus to
            // when the modal has hidden
            this.$refs['my-modal'].toggle('#toggle-btn')
        }
    }
};
</script>

<style>
.vuecal__event.unavail {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}

.vuecal__cell-split .split-label {
    color: rgba(0, 0, 0, 0.1);
    font-size: 5em;
}

.scrollable {
    height: 70vh;
}




.vuecal__event {
    background-color:#102B72;
    color:#fff;
    border:1px solid slategray;
}

.vuecal--overflow-x.vuecal--day-view.vuecal--sticky-split-labels .vuecal__time-column {
    margin-top: 4.7em;
}

.vuecal__split-days-headers .day-split-header {
    height: 75px;
}

.vuecal__cell-split {
    border-right:0.1px solid #e0e0e0;
}

.vuecal__no-event {
    display: none;
}

</style>
