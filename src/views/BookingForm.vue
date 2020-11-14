<template>
  <Wizard
    :title="title"
    :bookingDate="bookingDate"
    :facility="facility"
    :from="from"
    :to="to"
    :subtitle ="subtitle"
  />
</template>

<script>
//component code
import Wizard from "@/components/Wizard";
import moment from "moment";

export default {
  name: "BookingForm",
  components: {
    Wizard
  },
  mounted() {
    //   console.log("PASSED IN FROM WEIMINN");"2020-12-10"
      this.selectedTiming = this.$route.params.selectedTiming;
    
 this.$data.bookingDate=''
     this.$data.from=''
       this.$data.to=''
    if(this.selectedTiming.bookingStart.includes('/')){
        this.$data.bookingDate = moment(this.selectedTiming.bookingStart).format("YYYY-MM-DD").toString();

      this.$data.from = moment(this.selectedTiming.bookingStart).format("HH:mm:ss").toString();
      this.$data.to = moment(this.selectedTiming.bookingEnd).format("HH:mm:ss").toString();
    }
    else{
   this.$data.bookingDate = moment(this.selectedTiming.bookingStart,"DD-MM-YYYY").format("YYYY-MM-DD").toString();

      this.$data.from = moment(this.selectedTiming.bookingStart,"DD-MM-YYYY, hh:mm:ss").format("HH:mm:ss").toString();
      this.$data.to = moment(this.selectedTiming.bookingEnd,"DD-MM-YYYY, hh:mm:ss").format("HH:mm:ss").toString();

    }
     
     
    
      this.$data.facility = this.selectedTiming.booking;
  },

  data() {
    return {
      selectedTiming: this.$route.params.selectedTiming,
      title: "Facility Booking",
      subtitle:"",
      bookingDate: "",
      facility: "",
      from: "",
      to: ""
    };
  }
};
</script>

<style scoped>
</style>