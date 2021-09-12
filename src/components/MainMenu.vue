<template>
    <div id="main-menu">
        <div id="user-profile">
            <UserProfile :profile="profile"/>
        </div>
        <div id="game-mode-selection">
            <GameModeSelectionMenu/>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import Profile from "@/interfaces/profile";
import UserProfile from "@/components/main-menu/UserProfile.vue";
import GameModeSelectionMenu from "@/components/main-menu/GameModeSelectionMenu.vue";

export default defineComponent({
    name: "MainMenu",
    components: {UserProfile, GameModeSelectionMenu},
    props: {
        profile: {
            type: Object as PropType<Profile>
        }
    },
    mounted() {
        // Execute on creation
    },
    // data() {
    //   // Data
    // },
    computed: {},
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">
#main-menu {
    #user-profile {
        width: 30%;
    }

    $width: 40%;
    #game-mode-selection {
        display: block;
        position: absolute;
        top: 50%;
        right: 50% - $width;
        width: $width;
    }
}
</style>
