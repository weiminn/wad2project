<template>
  <b-card bg-variant="light" :title="taskName" align="left">
    <b-card-text>
      <b-row>
        <b-col cols="12">{{ taskDesc }}</b-col>
        <b-col class="text-right">
          <b-button variant="outline-primary" v-on:click="accept($event)" :data-taskname="taskName">Accept</b-button>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    taskName: String,
    taskDesc: String,
  },
  methods: {
    accept: (evt) => {
      let taskName = evt.target.dataset.taskname
      alert(`Accepting ${taskName}`)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
