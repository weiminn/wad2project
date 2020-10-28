<template>
  <div
    :class="{
      'unavailable': !a,
      'selected': select, 
      'base': true
    }"
    v-on:click="toggle"
    style="border: 1px solid black;"
  >
    {{t}}
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    t: String,
    a: Boolean,
    select: Boolean
  },
  data() {
    return {
      s: false
    };
  },
  methods: {
    toggle: function() {
        if(this.$props.a){
            this.$data.s = this.$props.select;
            this.$data.s = !this.$data.s;
            this.$emit('cellToggled', {
                    't': this.$props.t,
                    's': this.$data.s
            });
        }      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selected {
  background-color: aqua;
}
.unavailable {
  background-color: grey;
}
.base {
    padding: 5px;
    // height: 20px;
    // margin-bottom: 50px;
}
</style>