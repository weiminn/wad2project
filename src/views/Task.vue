<template>
  <div class="task">
    <div class="padding-bottom-10 text-left">
      <b-button variant="outline-primary" v-on:click="acceptAll">
        Accept All
      </b-button>
    </div>

    <b-row>
      <b-col sm="12" md="6" lg="4" v-for="task in tasks" :key="task.id">
        <TaskCard
          :bookingDetails="task"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";

import app from "../firebase.service.js";

const db = app.database();
const bookingsRef = db.ref("booking");

export default {
  components: {
    TaskCard,
  },
  data() {
    return {
      tasks: {},
    };
  },
  computed :{
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    acceptAll: function() {
      alert('Accepting all "Pending Confirmation" tasks');
      var userInfo = this.userInfo
      var userID = userInfo.userID;
      this.tasks.map((val) => {
        if (val.status.toUpperCase() == "P"){
          
          this.$set(val.coBookers, userID, true);

          var status = Object.values(val.coBookers).every(v => v === true) ? 'A' : 'P'
          this.$set(val, "status", status);

          var data = Object.keys(val).reduce((object, key) => {
            if (key !== "id") {
              object[key] = val[key];
            }
            return object;
          }, {});
          bookingsRef.child(val.id).update(data);
        }
      })
      this.$router.go();
    },
    fetchData: async function (){
      let userInfo = this.userInfo;
      let userID = userInfo.userID
      let data = await bookingsRef.once("value").then(function(snapshot) {
          let data = snapshot.val();
          let keys = Object.keys(data);

          let dataFormatted = Object.values(data).map((val, index) => {
            if (val != null){
              if("coBookers" in val && userID in val.coBookers && !val.coBookers[userID]){
                return {...val, status: val.status.toUpperCase(), id: keys[index]}
              }
            }
          })

          dataFormatted = dataFormatted.filter(val => {
            return val != null
          })
          dataFormatted = dataFormatted.filter(val => {
            return val.status != "A"
          })
          console.log(dataFormatted);
          return dataFormatted
      }).then(res => {return res})

      this.tasks = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.row > div {
  margin-bottom: 10px;
}

.padding-bottom-10 {
  padding-bottom: 10px;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>
