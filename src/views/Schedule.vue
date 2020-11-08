<template>
    <div>
        <div class="row">
            <div class="col">
                <b-button class="mt-2" block @click="back">Back</b-button>
            </div>
            <div class="col">
                <h3>
                    Room Schedules
                </h3>
            </div>
            <div class="col">
                <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Floorplans</b-button>
            </div>
        </div>
        

        <vue-cal
            class="scrollable"
            hide-view-selector
            :time-from="tFrom * 60"
            :time-to="tTo * 60"
            :time-step="30"
            :disable-views="['years', 'month', 'year', 'week']"
            active-view="day"
            editable-events
            :events="books"
            :split-days="daySplits"
            :sticky-split-labels="true"
            :min-split-width="100"
            :snap-to-time="30"
            @event-drag-create="onEventCreate"
            @event-duration-change="onEventChange"
            @event-delete="onEventDelete"
        >
        
        </vue-cal>
        <!-- style bookings -->

        <b-button @click="next" style="margin-top: 20px;" variant="primary">NEXT</b-button>

        <b-modal ref="my-modal" hide-footer title="Mapp">
            <div class="d-block text-center">
                <h3>Selected Rooms</h3>
                <b-carousel
                    id="carousel-no-animation"
                    style="text-shadow: 0px 0px 2px #000"
                    no-animation
                    indicators
                    img-width="1024"
                    img-height="480"
                >
                    <b-carousel-slide 
                    v-for="l in links"
                    :key="(l.level, l.building)"
                    :caption="l.level"
                    :img-src="l.url"
                    ></b-carousel-slide>
                </b-carousel>
            </div>
            <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Hide</b-button>
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
const roomRef = db.ref("school");
const storage = app.storage();

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
            tFrom: 8,
            tTo: 16,
            building: "SIS",
            levels: ["level2", "level3"],
            links: [],
            roomsToRetrieve: [
                "SIS GSR 2-1",
                "SIS GSR 2-2",
                "SIS GSR 2-3",
                "SIS GSR 2-4",
                "SIS GSR 2-5",
                "SIS GSR 2-6",
            ],
            selectedArr: [],
            selectedEvent: null,
            books: [],
            daySplits: [],
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
            console.log(data);
            var _books = Object.values(data).filter((b) => 
                (new Date(Date.parse(b.bookingStart))).getDate().toString() == (new Date()).getDate().toString() &&
                (new Date(Date.parse(b.bookingStart))).getMonth().toString() == (new Date()).getMonth().toString() &&
                (new Date(Date.parse(b.bookingStart))).getFullYear().toString() == (new Date()).getFullYear().toString()
            );
            console.log("filtered: " + _books.length);
            console.log(_books);

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

            this.levels.forEach(level => {
                roomRef.child(this.building).child(level).once('value', snap => {
                    storage.ref(snap.val().path).getDownloadURL().then(u => {
                        this.links.push({
                            building: this.building,
                            level: level,
                            url: u
                        });
                    });
                });
            })

            console.log(this.links);
        });
        },
        onEventChange: function(event) {
            console.log(event);
            console.log(this.selectedArr.length);
        },
        onEventCreate: function(event) {
            this.selectedArr.push(event);
        },
        onEventDelete: function(event) {
            this.selectedArr = this.selectedArr.filter(e => e._eid !== event._eid);
        },
        checkClash(cb){
            var clear = true;
            for (let index = 0; index < this.books.length; index++) {
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
                    }      
                }
                if(index == this.books.length-1){
                    cb(clear);
                }
            }
        },
        next: function() {
            if(this.selectedArr.length == 1){
                this.checkClash((clear) => {
                    if(clear){
                        console.log("Sending: " + (this.selectedArr[0].end));
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
                        alert("Timing Clash!");
                        console.log("Timing Clash!");
                    }
                })                
            } else {
                alert("Please select one and only continuous slot.");
                console.log("Please select one and only continuous slot.");
            }
        },
        back() {

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
</style>
