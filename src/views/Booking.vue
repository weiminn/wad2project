<template>
  <div>
    <b-card-group columns>
      <Card
        v-for="photo in photos"
        :key="photo.id"
        :title="photo.author"
        :img="photo.download_url"
      />
    </b-card-group>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Booking",
  components: {
    Card,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      photos: [],
    };
  },
  methods: {
    async fetchData() {
      const res = await fetch("https://picsum.photos/v2/list");
      const val = await res.json();
      console.log(val);
      this.photos = val;
    },
  },
};
</script>
