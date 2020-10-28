<template>
    <div class="chart">
        <Columns :rooms="rooms"
            @columnsToggled="toggled($event)">
        </Columns>
    </div>
</template>

<script>

import Columns from "@/components/Columns";

export default {
  name: "Chart",
  components: {
      Columns,
  },
  props: {
    rooms: Array
  },
  methods: {
      toggled: function(event) {
          this.$emit('chartToggled', event)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .chart {
        display:grid;
    }
</style>
