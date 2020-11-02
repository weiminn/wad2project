<template>
  <form-wizard @on-complete="onComplete" :title="title" shape="tab">
    <tab-content title="Personal details" icon="ti-list">
      <div class="container">
        <b-row class="d-flex justify-content-center" style="margin-top:'30px'">
          <b-col sm="12" md="12" lg="6">
            <b-input-group size="md">
              <b-input-group-prepend is-text>
                <b-icon icon="calendar3"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                type="date"
                id="bookingDate"
                :value="date"
                disabled
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row class="d-flex justify-content-center">
          <b-col sm="6" md="6" lg="3">
            <b-input-group prepend="From" size="md">
              <b-form-input
                type="time"
                id="timeFrom"
                :value="from"
                disabled
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="6" lg="3">
            <b-input-group prepend="To" size="md">
              <b-form-input
                type="time"
                id="timeTo"
                :value="to"
                disabled
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-center">
          <b-row style="margin-top:20px">
            <b-col sm="12" md="12" lg="12">
              <h6>Floor : Level 2</h6>
            </b-col>
          </b-row>
        </div>
        <b-row style="margin-top:'30px'" class="d-flex justify-content-center">
          <b-col sm="12" md="12" lg="6">
            <b-input-group size="md" prepend="Facility">
              <b-form-select
                name="facility"
                id="facility"
                :value="facility"
                :options="facilityOptions"
                disabled
              >
                <template v-slot:first>
                  <option value="" disabled>- Select Facility -</option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row style="margin-top:'30px'" class="d-flex justify-content-center">
          <b-col sm="12" md="12" lg="6">
            <b-input-group size="md" prepend="Purpose">
              <b-form-input
                v-model="purpose"
                id="link"
                :value="purpose"
                placeholder="Enter purpose of booking"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row style="margin-top:'30px'" class="d-flex justify-content-center">
          <b-col sm="12" md="12" lg="6">
            <b-input-group size="md" prepend="Use Type">
              <b-form-select name="usetype" id="usetype" v-model="usetype">
                <template v-slot:first>
                  <option value="" disabled>- Select Use Type -</option>
                  <option value="academic">Academic</option>
                  <option value="adhoc">Ad Hoc</option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-col>
        </b-row>

        <div v-if="usetype == 'academic'">
          <b-row
            style="margin-top:'30px'"
            class="d-flex justify-content-center"
          >
            <b-col sm="12" md="12" lg="6">
              <b-input-group size="md" prepend="Course Code">
                <b-form-select
                  name="course"
                  id="course"
                  :options="courseOptions"
                >
                  <template v-slot:first>
                    <option value="" disabled>- Select Course Code -</option>
                  </template>
                </b-form-select>
              </b-input-group>
            </b-col>
          </b-row>
        </div>

        <b-row style="margin-top:'30px'" class="d-flex justify-content-center">
          <b-col sm="12" md="12" lg="6">
            <b-input-group size="md" prepend="Booking Usage">
              <b-form-select
                v-model="bookingUsage"
                name="bookingUsage"
                id="bookingUsage"
              >
                <template v-slot:first>
                  <option value="interview">Interview-</option>
                  <option value="meeting">Meeting</option>
                  <option value="research">Research</option>
                  <option value="seminar">Seminar</option>
                  <option value="sponsor">Sponsor Venue</option>
                  <option value="recreational"
                    >Staff Recreational Activities</option
                  >
                  <option value="training">Staff Training</option>
                  <option value="activties">Student Activties</option>
                  <option value="teaching">Teaching</option>
                  <option value="uniEvent">University's Event</option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-col>
        </b-row>
      </div>
    </tab-content>

    <tab-content title="Additional Info" icon="ti-settings">
      <div id="cobookers">
        <h3>Add Co-bookers</h3>
        <b-row class="d-flex justify-content-center">
          <b-col sm="12" md="6" lg="6">
            <b-input-group size="md">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-info" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-center">
          <b-table
            class="col-md-6 col-lg-6 col-sm-12"
            ref="selectedTable"
            ef="selectableTable"
            selectable
            :select-mode="selectMode"
            :items="items"
            :fields="fields"
            responsive="sm"
            @row-selected="onRowSelected"
            caption-top
            :filter="filter"
          >
            <template #table-caption></template>

            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </div>
        <b-button variant="outline-info" @click="save()">Download</b-button>
        <hr style="border: solid 1px #cccccc" />
      </div>

      <div id="resources">
        <h3>Resource</h3>
        <b-row class="d-flex justify-content-center">
          <b-col sm="12" md="6" lg="6">
            <b-input-group size="md">
              <b-input-group-prepend is-text>
                <b-icon icon="link-45deg"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="text" id="link" v-model="link"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-info" @click="addUrl()"
                  >Add</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>

        <div class="d-flex justify-content-center">
          <b-table
            class="col-md-6 col-lg-6 col-sm-12"
            ref="selectableURLTable"
            selectable
            :items="urlItems"
            :fields="urlFields"
            @row-selected="onURLRowSelected"
            responsive="sm"
            caption-top
          >
          </b-table>
        </div>
      </div>
    </tab-content>

    <tab-content title="Last step" icon="ti-check">
      <div>
        <b-row class="d-flex justify-content-center">
          <b-col sm="12" md="6" lg="6">
            <b-jumbotron
              style="text-align:center"
              lead="Acknowledgement and declaration"
            >
              <p>
                SMU staff/students are given the privilege to book and use the
                common facilities in SMU campus for University related functions
                and school activities (i.e. internal events). With safe
                distancing measures for COVID-19, only students who are granted
                approval to be in campus should book the facilities, else access
                to these facilities via the buildings will be denied.
              </p>
              <br />
              <p>
                Staff/students who intend to book facilities for non-University
                activities (i.e. external events) are required to approach
                Leasing Business, Office of Campus Infrastructure and Services
                (LB-OCIS, email: leasing@smu.edu.sg or conference@smu.edu.sg).
              </p>
              <br />
              <p>
                Any booking and use of SMU facilities for external events
                without proper approval is prohibited. By proceeding with this
                confirmation, I acknowledge the above terms of use for the
                booking of the facilities.
              </p>
              <br />
              <b-row class="d-flex justify-content-center">
                <b-col sm="9">
                  <p><b>I declare that my booking is for :</b></p>

                  <ol type="a" style="text-align:center">
                    <li>internal event; OR,</li>
                    <li>
                      external event, for which I shall submit the sponsorship
                      form to LB shortly.
                    </li>
                  </ol>
                </b-col>
              </b-row>
              <b-check>I agree</b-check>
            </b-jumbotron>
          </b-col>
        </b-row>
      </div>
    </tab-content>
  </form-wizard>
</template>

<script>
import moment from "moment";
import app from "../firebase.service.js";


const db = app.database();
const userRef = db.ref("user");
const bookingRef = db.ref("booking");
export default {
  name: "Wizard",
  props: {
    title: String,
    date: String,
    facilityOptions: [],
    purpose: String,
    link: String,
    from: String,
    to: String,
    facility: String
  },

  data() {
    return {
      filter: "",
      usetype: ["Academic"],
      fields: ["selected", "first_name", "email"],
      items: [],
      urlFields: ["URL"],
      urlItems: [],
      URLselected: [],
      cobookers: [],
      cal: "",
      bookingUsage: ""
    };
  },
  methods: {
    onComplete: function() {
      bookingRef.on("value", function(snapshot) {
        console.log(bookingRef.key);
        console.log(snapshot.val());
      });
      var snap;
      bookingRef.limitToLast(1).on("child_added", function(childSnapshot) {
        snap = childSnapshot.numChildren();
        console.log(snap);
      });

   var cobookersInfo = this.cobookers;
   var cobookersEmail =[];
    for( var prop in cobookersInfo){
      console.log(cobookersInfo[prop]["email"])
      cobookersEmail.push(cobookersInfo[prop]["email"])

    }
  
      let start = moment(this.date + " " + this.from).format(
        "DD-MMM-YYYY, hh:mm A"
      );
      let end = moment(this.date + " " + this.to).format(
        "DD-MMM-YYYY, hh:mm A"
      );
      var key = snap + 1;
     
      // var newBookingRef = bookingRef.push();
      bookingRef.child(key).set({
        booking: this.facility,
        bookingEnd: end,
        bookingStart: start,
        purpose: this.purpose,
        useType: this.usetype,
        bookingUsage: this.bookingUsage,
        resourceLinks: this.urlItems,
        coBookers: cobookersEmail,
        status: "p"
      });


      
    },
    addUrl: function() {
      console.log(this.link);
      var my_url = {
        URL: this.link
      };

      this.urlItems.push(my_url);
      this.link = "";
      console.log(this.purpose);
    },
    save() {
      let start = moment(this.date + " " + this.from).format(
        "DD-MMM-YYYY, hh:mm A"
      );
      let end = moment(this.date + " " + this.to).format(
        "DD-MMM-YYYY, hh:mm A"
      );


      this.$ics.addEvent(
        "ru-ru",
        this.purpose,
        this.bookingUsage,
        this.facility,
        start,
        end,
        null,
        null,
        null
      );

      this.cal = this.$ics.calendar();
      console.log(this.purpose);
      this.$ics.download(this.purpose);
    },

    onURLRowSelected(items) {
      this.selected = items;
      var urlvalue = this.selected[0].URL;

      this.urlItems = this.urlItems.filter(function(el) {
        return el.URL != urlvalue;
      });
    },
    onRowSelected(items) {
      this.cobookers = items;
      console.log(this.cobookers);
    }
  },

  mounted() {
    userRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    });
  },

  watch: {
    usetype: function() {
      if (this.usetype == "academic") {
        this.items = [
          { first_name: "Weiminn", email: "weiminn@sis.smu.edu.sg" },
          { first_name: "Ram", email: "ramen@business.smu.edu.sg" },
          { first_name: "Qilin", email: "qilin@sosc.smu.edu.sg" }
        ];
      } else {
        this.items = [
          { first_name: "Weiminn", email: "weiminn@sis.smu.edu.sg" }
        ];
      }
    }
  }
};
</script>

<style>
.input-group {
  margin-bottom: 10px;
}

h3 {
  color: #999696;
}

#cobookers {
  margin-bottom: 50px;
}

#resources {
  margin-top: 50px;
}

ul {
  text-align: justify;
}
</style>