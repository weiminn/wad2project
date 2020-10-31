<template>
  <Wizard
    :title="title"
    :date="date"
    :facilityOptions="facilityOptions"
    :facility="facility"
    :from="from"
    :to="to"
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
    //   console.log("PASSED IN FROM WEIMINN");
      this.selectedTiming = this.$route.params.selectedTiming;

    //   this.$data.date = moment(this.selectedTiming.bookingStart).format("MM-DD-YYYY").toString();
      this.$data.date = (new Date(this.selectedTiming.bookingStart)).getMonth().toString() + "/" +
       (new Date(this.selectedTiming.bookingStart)).getDate().toString() + "/" +
       (new Date(this.selectedTiming.bookingStart)).getFullYear().toString();
       console.log(this.$data.date);

      this.$data.from = moment(this.selectedTiming.bookingStart).format("hh:mm").toString();
      this.$data.to = moment(this.selectedTiming.bookingEnd).format("hh:mm").toString();

      this.$data.facilityOptions.push(this.selectedTiming.booking);
      this.$data.facility = this.selectedTiming.booking;
  },

  data() {
    return {
      selectedTiming: this.$route.params.selectedTiming,
      title: "Facility Booking",
      date: "10-10-2020",
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