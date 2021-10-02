<template>
    <div id="overlay-wrapper">
        <div id="overlay-header">
            GameMode: {{ gameModeName }}
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { mapState } from 'vuex';

export default defineComponent({
    name: "GameStartOverlay",
    components: {},
    props: {},
    mounted() {
        // Execute on creation
    },
    // data() {
    //     // Data
    // },
    computed: {
        ...mapState({
            gameModeName: 'state.selectedGameMode.title'
        })
    },
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">
#overlay-wrapper {
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
}
</style>
