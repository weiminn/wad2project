<template>
  <b-card :title="title" :img-src="img" img-alt="Image" img-top>
    <b-card-text>
      This is a wider card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer.
    </b-card-text>
    <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    img: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
