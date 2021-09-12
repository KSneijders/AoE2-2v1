<template>
    <div id="window" v-bind:style="{backgroundImage: backgroundImage}">
        <Tabs v-on:tab-select="updateTab" />
        <div id="tab-container">
            <MainMenu :profile="profile" v-if="selectedTab.title === 'Main menu'"/>
            <History v-if="selectedTab.title === 'History'" />
            <Statistics v-if="selectedTab.title === 'Statistics'" />
        </div>

    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Challenges} from "@/interfaces/policies";
import {Ruleset} from "@/interfaces/ruleset";
import Profile from "@/interfaces/profile";
import Tabs from "@/components/Tabs.vue";
import LayoutTab from "@/interfaces/layout-tabs";
import MainMenu from "@/components/MainMenu.vue";
import Statistics from "@/components/Statistics.vue";
import History from "@/components/History.vue";


export default defineComponent({
    name: "App",
    components: {
        History,
        Statistics,
        Tabs,
        MainMenu
    },
    data() {
        return {
            challenges: {} as Challenges,
            ruleset: {} as Ruleset,
            profile: {} as Profile,
            selectedTab: {} as LayoutTab
        }
    },
    mounted() {
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/challenges/random/challenges.json')
            .then(content => this.challenges = content as Challenges)
        window.axios.get('https://raw.githubusercontent.com/KSneijders/AoE2-2v1/challenges/rulesets/default.json')
            .then(content => this.ruleset = content as Ruleset)
        window.fs.getProfile('default')
            .then(content => this.profile = content as Profile)
    },
    methods: {
        updateTab: function (tab: LayoutTab) {
            this.selectedTab = tab;
        }
    },
    computed: {
        backgroundImage: function (): string {
            return `linear-gradient(to bottom right, rgba(44, 80, 57, 1), rgba(82,121,67,0.8)), url('${this.selectedTab.image}')`
        }
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
    width: 100%;
}

#window {
    width: 100%;
    height: 100vh;
    padding: 10px 25px;
    -webkit-box-shadow: 6px 13px 23px -8px rgba(82, 121, 67, 1);
    box-shadow: 6px 13px 23px -8px rgba(82, 121, 67, 1);
    z-index: 5;
}
</style>
