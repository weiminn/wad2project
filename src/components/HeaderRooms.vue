<template>
    <div class="header">
        <div style="display: inline-block;"
            v-for="r in rooms" v-bind:key="r.id" 
            class="">
            <div>{{r.building}}</div>
            <div>{{r.type}}</div>
            <div>{{r.level}} - {{r.unit}}</div>
        </div>

    </div>
</template>

<script>

// import Column from "@/components/Column";

export default {
    name: "HeaderRooms",
    props: {
        rooms: Array
    },
    methods: {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .header {
        border: 1px solid black;
        height: 30px;
    }
</style>
