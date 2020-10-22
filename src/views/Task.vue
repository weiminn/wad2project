<template>
  <div class="task">
    <div class="padding-bottom-10 text-left">
      <b-button variant="outline-primary" v-on:click="acceptAll">
        Accept All
      </b-button>
    </div>

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
    };
  },
  methods: {
    acceptAll: function() {
      alert('Accepting all "To Be Confirmed" tasks');
    },
  },
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
