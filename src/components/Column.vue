<template>
    <div class="column">
        <Cell 
            v-for="(avail, time) in room.timeslots_available" 
            :key="time" :t="time" :a="avail" :select="room.timeslots_selected[time]"
            @cellToggled="toggled($event)"  
        >
        </Cell>
    </div>
</template>

<script>

import Cell from "@/components/Cell";

export default {
  name: "Column",
  components: {
      Cell
  },
  props: {
    room: Object
  },
  methods: {
        toggled: function(event) {
            var toEmit = {
                't': event.t,
                's': event.s,
                'id': this.$props.room.id
                };
            this.$emit("columnToggled", toEmit);
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .column {
        text-align: center;
        width: 70px; 
        border: 1px solid black; 
        // padding: 2px;
        margin-left: 5px;
        vertical-align: top;
    }

</style>
