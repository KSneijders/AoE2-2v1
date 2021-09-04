<template>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div>

    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";

export default defineComponent({
    name: "App",
    components: {

    },
    data() {
        return {
            challenges: {} as Challenges,
            ruleset: {} as Ruleset
        }
    },
    mounted() {
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/challenges/random/challenges.json')
            .then(content => this.challenges = content as Challenges)
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/rulesets/default.json')
            .then(content => this.ruleset = content as Ruleset)
    },
    methods: {

    }
})

</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
