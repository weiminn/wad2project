<template>
  <div class="task">
    <div class="padding-bottom-10 text-left">
      <b-button variant="outline-primary" v-on:click="acceptAll">Accept All</b-button>
    </div>
    
    <b-row>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 1" taskDesc="Some task to do"/>
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 2" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 3" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 4" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 5" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 6" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 7" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 8" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 9" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 10" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 11" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 12" taskDesc="Some task to do" />
      </b-col>
      <b-col sm="12" md="6" lg="3">
        <TaskCard taskName="Task 13" taskDesc="Some task to do" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";
export default {
  components: {
    TaskCard,
  },
  data() {
    return {};
  },
  methods: {
    acceptAll: () => {
      alert("Accepting all tasks")
    },

    accept: (evt) => {
      console.log(evt)
    }
  },
};
</script>

<style lang="scss" scoped>
  .row > div{
    margin-bottom: 10px;
  }

  .padding-bottom-10{
    padding-bottom: 10px;
  }
</style>
