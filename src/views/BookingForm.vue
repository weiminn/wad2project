<template>
  <Wizard
    :title="title"
    :bookingDate="bookingDate"
    :facilityOptions="facilityOptions"
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

      this.selectedTiming = this.$route.params.selectedTiming;
      console.log( this.$route.params.selectedTiming);
      
      this.$data.bookingDate = moment(this.selectedTiming.bookingStart).format("YYYY-MM-DD").toString();

      
     
     

      
      this.$data.from = moment(this.selectedTiming.bookingStart).format("HH:mm:ss").toString();
      this.$data.to = moment(this.selectedTiming.bookingEnd).format("HH:mm:ss").toString();

      // console.log(this.$data.from)
      this.$data.facilityOptions.push(this.selectedTiming.booking);
      this.$data.facility = this.selectedTiming.booking;
  },

  data() {
    return {
      selectedTiming: this.$route.params.selectedTiming,
      title: "Facility Booking",
      subtitle:"",
      bookingDate: "",
      facilityOptions: [],
      facility: "",
      from: "",
      to: ""
    };
  }
};
</script>

<style scoped>
</style>