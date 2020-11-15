<template>
  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-col sm="12" md="9" lg="9">
        <form-wizard
          @on-complete="onComplete"
          :title="title"
          :subtitle="subtitle"
          shape="tab"
          color="#102B72"
        >
          <tab-content title="Details" icon="ti-list">
            <div class="container">
              <b-row
                class="d-flex justify-content-center"
                style="margin-top: '30px'"
              >
                <b-col sm="12" md="12" lg="8">
                  <b-input-group size="md">
                    <b-input-group-prepend is-text>
                      <b-icon icon="calendar3"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="date"
                      id="bookingDate"
                      :value="bookingDate"
                      v-model="bookingDate"
                      disabled
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>

              <b-row class="d-flex justify-content-center">
                <b-col sm="6" md="6" lg="4">
                  <b-input-group prepend="From" size="md">
                    <b-form-input
                      type="time"
                      id="timeFrom"
                      :value="from"
                      disabled
                    ></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col sm="6" md="6" lg="4">
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
                <b-row style="margin-top: 20px">
                  <b-col sm="12" md="12" lg="12"> </b-col>
                </b-row>
              </div>
              <b-row
                style="margin-top: '30px'"
                class="d-flex justify-content-center"
              >
                <b-col sm="12" md="12" lg="8">
                  <b-input-group size="md" prepend="Facility">
                    <b-input
                      v-model="facility"
                      id="facility"
                      :value="facility"
                      placeholder="Enter purpose of booking"
                      disabled
                    ></b-input>
                      <template v-slot:first> </template>
                   
                  </b-input-group>
                </b-col>
              </b-row>

              <b-row
                style="margin-top: '30px'"
                class="d-flex justify-content-center"
              >
                <b-col sm="12" md="12" lg="8">
                  <b-input-group size="md" prepend="Use Type">
                    <b-form-select
                      name="usetype"
                      id="usetype"
                      v-model="usetype"
                      required
                    >
                      <template v-slot:first>
                        <option value="" disabled>- Select Use Type -</option>
                        <option value="academic">Academic</option>
                        <option value="adhoc">Ad Hoc</option>
                      </template>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>

              <b-row
                style="margin-top: '30px'"
                class="d-flex justify-content-center"
              >
                <b-col sm="12" md="12" lg="8">
                  <b-input-group size="md" prepend="Booking Usage">
                    <b-form-select
                      v-model="bookingUsage"
                      name="bookingUsage"
                      id="bookingUsage"
                      required
                    >
                      <template v-slot:first>
                        <option value="interview">Interview</option>
                        <option value="meeting">Meeting</option>
                        <option value="research">Research</option>
                        <option value="seminar">Seminar</option>
                        <option value="sponsor">Sponsor Venue</option>
                        <option value="recreational">
                          Staff Recreational Activities
                        </option>
                        <option value="training">Staff Training</option>
                        <option value="activties">Student Activties</option>
                        <option value="teaching">Teaching</option>
                        <option value="uniEvent">University's Event</option>
                      </template>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>

                      <b-row
                style="margin-top: '30px'"
                class="d-flex justify-content-center"
              >
                <b-col sm="12" md="12" lg="8">
                  <b-input-group size="md" prepend="Purpose">
                    <b-form-textarea
                      v-model="purpose"
                      id="purpose"
                      :value="purpose"
                      placeholder="Enter purpose of booking"
                      required
                    ></b-form-textarea>
                  </b-input-group>
                </b-col>
              </b-row>

            </div>
          </tab-content>

          <tab-content title="Extras" icon="ti-info-alt">
            <div id="cobookers">
              <h5>Add Co-bookers</h5>
              <b-row class="d-flex justify-content-center">
                <b-col sm="12" md="12" lg="9">
    

                      <!--  @close="rePopulate()" 
                      @remove="rePopulate()"  -->
                  <multiselect  
                      @close="addCoBookersFinal()"
                      v-model="selectedCobooker" 
                      placeholder="Add a co-booker" 
                      label="cobooker" 
                      track-by="value" 
                      :options="cobookers" 
                      :searchable="true"
                      :max="noOfCoBookersAllowed"
                      :show-labels="false" 
                      :multiple="true" 
                      :taggable="false" 
                      :close-on-select="true"
                      @tag="addCoBookers"></multiselect>
                       

                  <br>
                  <b-check 
                      v-model="checkSend"
                      id="checkSend"
                      :checked="checkSend"
                      >Send Calendar Invite</b-check
                    >
                </b-col>
              </b-row>
          
            </div>

            <div id="resources">
              <h5>Resource</h5>
              <b-row class="d-flex justify-content-center">
                <b-col sm="12" md="12" lg="9">
                  <b-input-group size="md">
                    <b-input-group-prepend is-text>
                      <b-icon icon="link-45deg"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      id="link"
                      v-model="link"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button variant="outline-info" @click="addUrl()"
                        >Add</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>

              <b-row class="d-flex justify-content-center">
                <b-col sm="12" md="12" lg="9">
                  <b-table
                    style="table-layout: fixed;"
                    ref="selectableURLTable"
                    :items="urlItems"
                    :fields="urlFields"
                    responsive="sm"
                    caption-top
                  >
                    <template #cell(actions)="row">
                      <template v-if="row">
                        <b-button size="sm" @click="onURLRowSelected(row.item)">
                          Remove
                        </b-button>
                      </template>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </div>
          </tab-content>

          <tab-content title="Legal" icon="ti-check-box">
            <div>
              <b-row class="d-flex justify-content-center">
                <b-col sm="12" md="12" lg="10">
                  <b-jumbotron
                    style="text-align: center"
                    lead="Acknowledgement and declaration"
                  >
                    <p>
                      SMU staff/students are given the privilege to book and use
                      the common facilities in SMU campus for University related
                      functions and school activities (i.e. internal events).
                      With safe distancing measures for COVID-19, only students
                      who are granted approval to be in campus should book the
                      facilities, else access to these facilities via the
                      buildings will be denied.
                    </p>
                    <br />
                    <p>
                      Staff/students who intend to book facilities for
                      non-University activities (i.e. external events) are
                      required to approach Leasing Business, Office of Campus
                      Infrastructure and Services (LB-OCIS, email:
                      leasing@smu.edu.sg or conference@smu.edu.sg).
                    </p>
                    <br />
                    <p>
                      Any booking and use of SMU facilities for external events
                      without proper approval is prohibited. By proceeding with
                      this confirmation, I acknowledge the above terms of use
                      for the booking of the facilities.
                    </p>
                    <br />
                    <b-row class="d-flex justify-content-center">
                      <b-col sm="9">
                        <p><b>I declare that my booking is for :</b></p>

                        <ol type="a" style="text-align: center">
                          <li>internal event; OR,</li>
                          <li>
                            external event, for which I shall submit the
                            sponsorship form to LB shortly.
                          </li>
                        </ol>
                      </b-col>
                    </b-row>
                    <b-check
                      v-model="checkSelected"
                      id="checkSelected"
                      :checked="checkSelected"
                      >I agree</b-check
                    >
                  </b-jumbotron>
                </b-col>
              </b-row>
            </div>
          </tab-content>
        </form-wizard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import app from "../firebase.service.js";
import Multiselect from 'vue-multiselect';

const db = app.database();
const userRef = db.ref("user");
const bookingRef = db.ref("booking");
export default {
  name: "Wizard",
  props: {
    title: String,
    subtitle: String,
    bookingDate: String,
    
    from: String,
    to: String,
    facility: String,
  },

  data() {
    return {
      filter: "",
      usetype: ["Academic"],
      // fields: ["selected", "first_name", "email"],
      // items: [],
      urlFields: ["URL", { key: "actions", label: "Actions" }],
      urlItems: [],
      purpose: "",
      link: "",
      URLselected: [],
      cal: "",
      bookingUsage: "",
      checkSend : false,
      checkSelected: false,
      selectedCobooker: null,
      cobookers: [],
      noOfCoBookersAllowed: 1
    };
  },
  components: {
    Multiselect
  },
  methods: {
    postData: async function (url, data) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        headers: {
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
          "Content-Type": "form-data",
        },
        body: data, // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },

    onComplete: async function () {
      // var userInfo = this.userInfo;
      // var userID = userInfo.userID;
      // console.log(userID);
      var cobookersInfo = this.selectedCobooker;
      var cobookersEmail = [];
      var users;
      var booker = this.$store.state.userInfo.userID;
      for (var prop in cobookersInfo) {
        userRef.on("value", function (snapshot) {
          users = snapshot.val();
        });
        cobookersEmail.push(cobookersInfo[prop]["value"]);
      }

      var cobookersID = [];
      for (var user in users) {
        for (var email in cobookersEmail) {
          if (users[user]["email"] == cobookersEmail[email]) {
            var data = {};
            data[user] = false;
            cobookersID = { ...data, ...cobookersID };
          }
        }
      }

      let start = moment(this.bookingDate + " " + this.from).format(
        "MM-DD-YYYY, hh:mm:ss A"
      );
      
      let end = moment(this.bookingDate + " " + this.to).format(
        "MM-DD-YYYY, hh:mm:ss A"
      );
      // console.log(start);
      // console.log(end);
      // console.log(this.to);

      var formattedhourto = moment(this.to, "HH:mm:ss").format("HH:mm");
      var formattedhourfrom = moment(this.from, "HH:mm:ss").format("HH:mm");

      var toTime =  moment(formattedhourto,"HH:mm");
      var fromTime = moment(formattedhourfrom,"HH:mm");
  
      var difference = toTime.diff(fromTime, "minutes");
    
      var totalCredits = (difference / 30) * 15
      // totalCredits = 105

      if (
        this.purpose == "" ||
        this.usetype == "" ||
        this.bookingUsage == "" ||
        cobookersID.length == 0
      ) {
        alert("you are required to fill up all the fields");
      } else {
        if (this.checkSelected == true) {
          // console.log(num);
          let isValid = await this.isSufficientCredit(
            totalCredits,
            cobookersID,
            booker
          );
         
          if (isValid) {
            console.log(cobookersID)
            bookingRef.push({
              booking: this.facility,
              bookingStart: start,
              bookingEnd: end,
              booker: booker,
              purpose: this.purpose,
              useType: this.usetype,
              bookingUsage: this.bookingUsage,
              resourceLinks: this.urlItems,
              coBookers: cobookersID,
              status: "p",
              credits: totalCredits,
            });
            
            if(this.checkSend == true){
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
             var individualEmail ;
            for(prop in cobookersEmail){
                individualEmail = cobookersEmail[prop];
                
                var blob = new Blob([this.$ics.calendar()], {type: "text/calendar;charset=utf-8",});
                let emailForm = new FormData();
                emailForm.append("content","Please confirm " + this.facility + " booking" );
                emailForm.append("recipient", individualEmail);
                emailForm.append("attachment", blob, "calendar.ics");
                // var emailContent = [emailForm];
                this.postData("https://dng4new.azurewebsites.net/mail/", emailForm);
            }
           
            
              
            }else{

              for(prop in cobookersEmail){
                individualEmail = cobookersEmail[prop];
                
                let emailForm = new FormData();
                emailForm.append("content","Please confirm " + this.facility + " booking" );
                emailForm.append("recipient", individualEmail);
                // var emailContent = [emailForm];
                this.postData("https://dng4new.azurewebsites.net/mail/", emailForm);
                // console.log(result)
            }

            }
          
            this.$router.push({
              name: "Booking",
            });
          } else {
            alert("Booker/Co-Booker(s) does not have enough credits");
          }
        } else {
          alert("Please agree to the Acknowledgement and Declaration");
        }
      }
    },

    isSufficientCredit: async function (totalCredits, cobookersID, booker) {
      let credits = Math.ceil(
        totalCredits / (Object.keys(cobookersID).length + 1)
      );

      let userIDs = Object.keys(cobookersID);
      userIDs.push(booker);

      let userInfos = await Promise.all(
        userIDs.map(async (val) => {
          let userInfo = await userRef
            .child(val)
            .once("value")
            .then(function (snapshot) {
              let data = snapshot.val();
              return data;
            })
            .then((res) => {
              return res;
            });

          return userInfo;
        })
      );

      let isValid = userInfos.every((val) => {
        return val.credits >= credits;
      });

      return isValid;
    },

    addUrl: function () {
      var my_url = {
        URL: this.link,
      };

      this.urlItems.push(my_url);
      this.link = "";
    },
    onURLRowSelected(items) {
      this.selected = items;
      var urlvalue = this.selected.URL;

      this.urlItems = this.urlItems.filter(function (el) {
        return el.URL != urlvalue;
      });
    },
    addCoBookers (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.selectedCobooker.push(tag);
      this.cobookers.push(tag);
    },
    getMaxCoBookers: function(){
      let facilityType = this.$route.params.selectedTiming.booking.split(" ")[1];

      if(facilityType == "GSR"){
          this.noOfCoBookersAllowed = 1;
      }else{
        this.noOfCoBookersAllowed = 2;
      }
    },
    addCoBookersFinal: function(){
      console.log(this.selectedCobooker);
    }
  },

  mounted() {
    var tablerows;
    userRef.on("value", function (snapshot) {
      tablerows = snapshot.val();
   
    });


    this.getMaxCoBookers();

    
    for (var props in tablerows) {
      if (this.$store.state.userInfo.userID != props) {
        this.cobookers.push({
          cobooker: tablerows[props]["fullName"]+" ("+tablerows[props]["email"]+")",
          value: tablerows[props]["email"]
        });
      }
    }

  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  watch: {
    usetype: function () {
      if (this.cobookers.length == 0) {
        var tablerows;
        userRef.on("value", function (snapshot) {
          tablerows = snapshot.val();
          // console.log(tablerows);
        });

        {{this.facility}}
         for (var props in tablerows) {
            if (this.$store.state.userInfo.userID != props) {
              this.cobookers.push({
                cobooker: tablerows[props]["fullName"]+" ("+tablerows[props]["email"]+")",
                value: tablerows[props]["email"]
              });
            }
          }
      }
    },
  },
};
</script>

<style>
table {border-collapse:collapse; table-layout:fixed; }
table td {width:400px; word-wrap:break-word;}

.vue-form-wizard .wizard-tab-content {
  padding:30px 0px 10px;
}

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

.vue-form-wizard .navbar .navbar-nav > li > a.wizard-btn,
.vue-form-wizard .wizard-btn {
  min-width: 100px;
}

.vue-form-wizard .wizard-icon-circle.tab_shape {
  min-width: 80px;
}
</style>