<template>
    <div id="game-end-button" @click="GameEndView">
        Game Finished
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "GameEndButton",
    emits: ['game-end-clicked'],
    components: {},
    props: {},
    data() {
        // Data
    },
    mounted() {
        // Execute on creation
    },
    computed: {},
    methods: {
        GameEndView(): void {
            if (confirm("Please confirm the game finished")) this.$emit('game-end-clicked')
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#game-end-button {
    margin: 5px;
    padding: 5px;
    background: $GREEN_BG_NORMAL;
    box-shadow: 0 2px 5px 1px #2f562d;

    user-select: none;

    &:hover {
        background: $GREEN_BG_HOVER;
        box-shadow: 0 2px 5px 1px #588653;
        cursor: pointer;
    }
}
</style>
