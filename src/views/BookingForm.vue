<template>
 <Wizard :title="title" 
 :date="date"
 :facilityOptions="facilityOptions"
 :facility="facility"
 :from ="from"
 :to ="to"

 />

</template>

<script>

//component code
import Wizard from "@/components/Wizard";
  export default {
    name: "BookingForm",
   components: {
    Wizard,

  },
  data() {
    return {
      title: "Facility Booking",
         date:"2020-10-29",//need to change to dynamic value,
          facilityOptions: ['GSR2-1','GSR2-2'],
          facility: 'GSR2-1',
          from:"11:11",
          to:"12:11",
         
        
         

    };
  }
    }
</script>

<style scoped>

</style>