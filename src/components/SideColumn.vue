<template>
    <div class="side-column">
        Selected Rooms
    </div>
</template>

<script>


export default {
    name: "SideColumn",
    components: {
    },
    props: {
        range: Object
    },
    methods: {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .side-column {
        width: 10%; 
        border: 1px solid black; 
        padding: 2px;
        text-align: center;
        vertical-align: top;
        writing-mode: vertical-lr;
        height: 100%;
    }
</style>

