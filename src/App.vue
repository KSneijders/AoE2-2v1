<template>
    <div>
        <h1>Selected Game Mode: {{ gameMode?.title }}</h1>

        <div id="game-mode-selection">
            <GameModeSelectionMenu/>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";
import GameModeSelectionMenu from "@/components/GameModeSelectionMenu.vue";
import {GameModeMenuItem} from "@/interfaces/game-mode";
import ChallengeCollection from "@/classes/challenge-collection";

export default defineComponent({
    name: "App",
    components: {
        GameModeSelectionMenu
    },
    data() {
        return {
            challenges: {} as Challenges,
            ruleset: {} as Ruleset
        }
    },
    mounted() {
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/challenges/random/challenges.json')
            .then(content => {this.challenges = content as Challenges})
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/rulesets/default.json')
            .then(content => {this.ruleset = content as Ruleset})

    },
    methods: {

    },
    computed: {
        gameMode: function (): GameModeMenuItem {
            return this.$store.state.selectedGameMode;
        }
    }
})

</script>

<style lang="scss">
body {
    padding: 0;
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #aebac5;
    background-color: #363636;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

$width: 40%;
#game-mode-selection {
    display: block;
    position: absolute;
    top: 50%;
    right: 50% - $width;
    width: $width;
}
</style>
