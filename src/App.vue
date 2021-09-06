<template>
  <div id="main-layout">
    <Layout />
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";
import Layout from "@/components/layout.vue";
import Profile from "@/interfaces/profile";

export default defineComponent({
    name: "App",
    components: {
      Layout
    },
    data() {
        return {
            challenges: {} as Challenges,
            ruleset: {} as Ruleset,
            profile: {} as Profile
        }
    },
    mounted() {
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/challenges/random/challenges.json')
            .then(content => this.challenges = content as Challenges)
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/rulesets/default.json')
            .then(content => this.ruleset = content as Ruleset)
        window.axios.getProfile('delano')
            .then(content => this.profile = content as Profile)
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
}
</style>
