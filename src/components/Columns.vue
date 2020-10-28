<template>
    <div class="columns">
        <div class="header">    
            <div style="display: inline-block;"
                class="header-cell"
                v-for="r in rooms" v-bind:key="r.id">
                <div>{{r.building}}</div>
                <div>{{r.type}}</div>
                <div>{{r.level}} - {{r.unit}}</div>
            </div>
        </div>

        <div class="room-columns">
            <Column style="display: inline-block;"
                v-for="r in rooms" :room="r" v-bind:key="r.id"
                @columnToggled="toggled($event)"
                >
            </Column>
        </div>
    </div>
</template>

<script>

import Column from "@/components/Column";
// import ScrollSync from 'vue-scroll-sync';

export default {
    name: "Columns",
    components: {
        Column,
        // ScrollSync
    },
    props: {
        rooms: Array
    },
    methods: {
        toggled: function(event) {
            this.$emit('columnsToggled', event)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .header {
        overflow-x: visible;
        white-space: nowrap;
        // position: fixed;
    }

    .header-cell {
        border: 1px solid black; 
        border-radius: 7%; 
        margin: 0 0 5px 5px;
        width: 70px; 
        padding: 2px;
        margin-left: 5px;
        text-align: center;
    }

    .room-columns {
        overflow-x: visible;
        white-space: nowrap;
    }

    .columns {
        overflow-x: scroll;
        overflow-y: scroll;
        height: 70vh;
        text-align: left;

        padding: 2px;
        border: 1px solid black;
    }


</style>
