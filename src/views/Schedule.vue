<template>
    <div>
        <b-row class="justify-content-md-center" no-gutters>
        
            <b-col>
                <b-row class="row legend">
                    <div class="col-md-4 legend-item "><b>Legend:</b></div>
                    <div class="col-md-4 legend-item unavailable">Confirmed</div>
                    <div class="col-md-4 legend-item pending">Pending</div>
                </b-row>
            </b-col>

            <b-col>
                <h3>
                    Facility Booking
                </h3>
            </b-col>

            <b-col>
                  <b-button variant="primary" size="sm" @click="toggleDragStateEvent" style="width:100px;">{{displayToggleState}}</b-button>
            </b-col>
        </b-row>
        
        <vue-cal
            id="vuecal"
            @view-change="viewChanged"
            :selected-date="selectedDate"
            class="scrollable vuecal--full-height-delete"
            hide-view-selector
            :time-cell-height="timeCellHeight"
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
            :drag-to-create-event="toggleDragState"
            @event-drag-create="onEventCreate"
            @event-duration-change="onEventChange"
            @event-delete="onEventDelete"
            @ready="scrollToCurrentTime"
            >
        </vue-cal>
        <!-- style bookings -->

        <div class="row d-flex justify-content-between" style="margin: 20px 20px 0 20px">
            <!-- <div class="col"> -->
                <b-button class="col-sm-3" style="margin-bottom:15px;width:100px;" @click="back">Back</b-button>
            <!-- </div> -->
                
            <!-- <div class="col"> -->
                <b-button class="col-sm-3" :disabled="!valid" style="margin-bottom:15px;width:100px;" @click="next" variant="primary">Next</b-button>
            <!-- </div> -->
        </div>

        <b-modal ref="my-modal" hide-footer title="Invalid Timing">
            <div class="d-block text-center">
                <ul>
                    <li>You may select one and only continuous slot.</li>
                    <li>Selected slot cannot start before current time of the day.</li>
                    <li>Selected slot cannot conflict with other booked slot(s).</li>
                    <li>Selected slot cannot be more than 4 hours.</li>
                </ul>
            </div>
        </b-modal>
    </div>
</template>

<script>

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

// import router from '../router/index.js';
import app from "../firebase.service.js";
import moment from "moment";

const db = app.database();
const bookingRef = db.ref("booking");
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
            this.selectedDate = new Date(this.$route.params.data.toDateTime);
            this.roomsToRetrieve = this.$route.params.data.selectedFacilities;
        }
        this.displayRooms();
    },
    data() {
        return {
            selectedDate: new Date(),
            tFrom: 8,
            tTo: 22.5,
            links: [],
            roomsToRetrieve: [],
            retrievedDates: [],
            selectedArr: [],
            selectedEvent: null,
            books: [],
            daySplits: [],
            valid: false,
            params:{ title: false, drag: (window.innerWidth > 768), resize: true, delete: true, create: true },
            timeCellHeight: 40,
            toastShown: false,
            toggleDragState: window.innerWidth > 768,
        };
    },
    computed: {
        displayToggleState: function() {
            return this.toggleDragState ? "Edit Mode" : "View Mode"
        }
    },
    methods: {
        toggleDragStateEvent(){
            this.toggleDragState = !this.toggleDragState;
            this.params.drag = !this.params.drag;
            console.log(this.params);
            console.log(this.toggleDragState);
        },
        displayRooms() {
        //display rooms
            for (let index = 1; index <= this.roomsToRetrieve.length; index++) {
                this.daySplits.push({
                    id: index,
                    label: this.roomsToRetrieve[index-1],
                    class: "room"
                });
            }   
            this.retrieveDay(new Date());         
        },
        retrieveDay(date){
            //retrieve bookings for particular date and rooms
            this.retrievedDates.push(date);
            bookingRef.once("value").then((snapshot) => {
                let data = snapshot.val();
                var _books = Object.values(data).filter((b) => 
                    moment(b.bookingStart, "MM-DD-YYYY, hh:mm:ss A").get('year') == date.getFullYear() &&
                    moment(b.bookingStart, "MM-DD-YYYY, hh:mm:ss A").get('month') == date.getMonth()&&
                    moment(b.bookingStart, "MM-DD-YYYY, hh:mm:ss A").get('date') == date.getDate()
                    // (new Date(Date.parse(b.bookingStart))).getDate().toString() == date.getDate().toString() &&
                    // (new Date(Date.parse(b.bookingStart))).getMonth().toString() == date.getMonth().toString() &&
                    // (new Date(Date.parse(b.bookingStart))).getFullYear().toString() == date.getFullYear().toString()
                );
                
                // populate bookings for the rooms
                _books.forEach(b => {
                    for (const s of this.daySplits) {
                        if(s.label == b.booking) {
                            b.split = s.id;
                        };
                    }

                    b.start = b.bookingStart;
                    b.end = b.bookingEnd;

                    if(b.status.toUpperCase() == "P"){
                        b.class = "pending";
                    } else {
                        b.class = "unavailable";
                    }
                    
                    b.deletable = false;
                    b.resizable = false;
                    
                    this.books.push(b);
                })
            });
        },
        viewChanged(event) {

            var checkArr = [];
            for (let index = 0; index < this.retrievedDates.length; index++) {
                if(
                    this.retrievedDates[index].getDate().toString() == event.startDate.getDate().toString() &&
                    this.retrievedDates[index].getMonth().toString() == event.startDate.getMonth().toString() &&
                    this.retrievedDates[index].getFullYear().toString() == event.startDate.getFullYear().toString()
                    ){
                    checkArr.push(this.retrievedDates[index]);
                }

                if(index == this.retrievedDates.length-1){
                    if(checkArr.length == 0) {
                        this.retrieveDay(event.startDate);
                    }
                }
            }
        },
        onEventChange: function(event) {
            console.log(event);
            console.log(this.selectedArr.length);
            this.checkValid();
        },
        onEventCreate: function(event) {
            this.selectedArr.push(event);
            this.params.create = false;

            this.checkValid();
        },
        onEventDelete: function(event) {
            this.selectedArr = this.selectedArr.filter(e => e._eid !== event._eid);
            this.params.create = true;
            this.valid = false;
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
                if(this.books[index].split == this.selectedArr[0].split){
                    if (
                        (moment(this.selectedArr[0].start).diff(moment(this.books[index].start, "MM-DD-YYYY, hh:mm:ss A")) <= 0 &&
                        moment(this.selectedArr[0].end).diff(moment(this.books[index].start, "MM-DD-YYYY, hh:mm:ss A")) <= 0)
                        ||
                        (moment(this.selectedArr[0].start).diff(moment(this.books[index].end, "MM-DD-YYYY, hh:mm:ss A")) >= 0 &&
                        moment(this.selectedArr[0].end).diff(moment(this.books[index].end, "MM-DD-YYYY, hh:mm:ss A")) >= 0)
                        ) {
                            //all clear
                            console.log("clear for " + index);
                    } else {
                        clear = false;
                        break;
                    }    
                    // alert()

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
        checkValid: function() {

            if(this.selectedArr.length == 1){
                this.checkClash((clear) => {

                    if(clear){
                        if((this.selectedArr[0].end - this.selectedArr[0].start)/(3600000) <= 4){
                            this.valid = true;
                            this.showToast();
                        } else {
                            console.log("Invalid Timing!");
                            this.valid = false;
                            this.showModal()
                        }
                    } else {
                        console.log("Invalid Timing!");
                        this.valid = false;
                        this.showModal()
                    }
                })                
            } else {
                
                this.showModal()
                this.valid = false;
                console.log("Please select one and only continuous slot.");
            }
        },
        next: function() {
            this.$router.push({
                name: 'BookingForm',
                params: {
                    selectedTiming: {
                        bookingStart: this.selectedArr[0].start,
                        bookingEnd: this.selectedArr[0].end,
                        booking: this.daySplits.filter(s => s.id == this.selectedArr[0].split)[0].label
                    }
                }
            });
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
        },
        scrollToCurrentTime() {
            console.log("Scrolling");
            if(
                new Date(this.$route.params.data.toDateTime).getDate().toString() == (new Date()).getDate().toString() &&
                new Date(this.$route.params.data.toDateTime).getMonth().toString() == (new Date()).getMonth().toString() &&
                new Date(this.$route.params.data.toDateTime).getFullYear().toString() == (new Date()).getFullYear().toString() &&
                (new Date()).getHours() > 10
                ){
                const calendar = document.querySelector('#vuecal .vuecal__bg');
                const hours = (new Date()).getHours() + (new Date()).getMinutes() / 60;
                calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' });
            }

            
        },
        showToast() {
            if(!this.toastShown){
                this.$bvToast.toast(`Press and Hold on the selected time slot to delete.`, {
                    title: `How to Delete`,
                    toaster: 'b-toaster-bottom-center',
                    solid: true,
                    noAutoHide: true,
                    appendToast: true,
                    variant: "info"
                })
                this.toastShown = true;
            }
            
        }
    }
};
</script>

<style>

.legend {
    margin: 5px;
    border: 1px solid rgb(135, 144, 153);
    padding: 5px;
}

.legend-item {
    font-size: .8em;
}

.vuecal__event.unavailable, .unavailable {
    background-color: rgba(202, 228, 234, 0.9);
    border: 1px solid rgb(90, 90, 90);
    color: rgb(90, 90, 90);
 
}
.vuecal__event.pending, .pending {
    background-color: rgba(255, 107, 107, 0.9);
    border: 1px solid  rgb(90, 90, 90);
    color: rgb(90, 90, 90);
}

.vuecal__cell-split .split-label {
    color: rgba(0, 0, 0, 0.1);
    font-size: 5em;
}

.scrollable {
    height: 67vh;
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
