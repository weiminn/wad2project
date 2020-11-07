<template>
  <div class="task">
  <b-jumbotron header="Bookings" >
    <p>Manage your bookings</p>

  </b-jumbotron>

    <b-row>
      <b-col sm="12" md="6" lg="3" v-for="task in tasks" :key="task.id">
        <TaskCard
          :booking="task.booking"
          :bookingStart="new Date(task.bookingStart)"
          :bookingEnd="new Date(task.bookingEnd)"
          :coBookers="task.coBookers"
          :status="task.status"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";
import TaskData from "@/assets/tasks.json";

export default {
    
  components: {
    TaskCard,
  },
  data() {
    return {
      tasks: TaskData,
        bookings: ""
     
    };
  },
  methods: {
      acceptAll: function () {
          alert('Accepting all "To Be Confirmed" tasks');
      },
         setBookings:function(data){
          this.bookings = data;
          console.log(this.bookings);
      },
      loadBookings: function () {
          fetch('https://wad2project-7fc17.firebaseio.com/booking.json').then(response => response.json())
              .then(data => this.setBookings(data));
      
      },
   

      },
       mounted() {
      this.loadBookings();
  
              
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
