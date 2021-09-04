<template>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import {defineComponent} from "vue";
import {Challenges} from "@/interfaces/policies";

export default defineComponent({
    name: "App",
    components: {
        HelloWorld,
    },
    data() {
        return {
            challenges: {} as Challenges
        }
    },
    mounted() {
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/challenges/random/challenges.json')
            .then(content => this.challenges = content)
    }
})

</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
