<template>
    <div id="window" v-bind:style="{backgroundImage: backgroundImage}">
        <Tabs v-on:tab-select="updateTab" />
        <div id="tab-container">
            <MainMenu v-if="selectedTab.title === 'Main menu'"/>
            <History v-if="selectedTab.title === 'History'" />
            <Statistics v-if="selectedTab.title === 'Statistics'" />
            <Profiles v-if="selectedTab.title === 'Profiles'" />
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Tabs from "@/components/Tabs.vue";
import LayoutTab from "@/interfaces/layout-tabs";
import MainMenu from "@/components/MainMenu.vue";
import Statistics from "@/components/Statistics.vue";
import History from "@/components/History.vue";
import {loadGameMode} from "@/scripts/challenges";
import Profiles from "@/components/Profiles.vue";


export default defineComponent({
    name: "App",
    components: {
        Profiles,
        History,
        Statistics,
        Tabs,
        MainMenu
    },
    data() {
        return {
            selectedTab: {} as LayoutTab
        }
    },
    mounted() {
        window.fs.getProfile('default').then(profile => this.$store.state.user = profile)
        loadGameMode('default').then(gamemodeContent => this.$store.state.defaultGamemode = gamemodeContent)
    },
    methods: {
        updateTab (tab: LayoutTab) {
            this.selectedTab = tab;
        }
    },
    computed: {
        backgroundImage (): string {
            return `linear-gradient(to bottom right, rgba(44, 80, 57, 1), rgba(82,121,67,0.8)), url('${this.selectedTab.image}')`
        }
    },
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
    color: #2c3e50;
    width: 100%;
}

* {
    box-sizing: border-box;
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
