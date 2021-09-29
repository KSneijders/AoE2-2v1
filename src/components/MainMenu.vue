<template>
    <div id="main-menu">
        <div id="user-profile">
            <UserProfile :profile="profile"/>
        </div>
        <div id="game-mode-selection-wrapper">
            <div id="game-mode-selection">
                <GameModeSelectionMenu/>
            </div>
            <div v-if="gameModeSelected" id="start-button">
                Start!
            </div>
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
    computed: {
        gameModeSelected: function(): boolean {
            return !!this.$store.state.selectedGameMode;
        }
    },
    methods: {},
    watch: {}
})

</script>

<style scoped lang="scss">
#main-menu {
    #user-profile {
        width: 30%;
    }

    #game-mode-selection-wrapper {
        display: block;
        position: absolute;
        bottom: 50px;
        right: 50px;
        width: 40%;
        height: 400px;

        #start-button {
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            color: whitesmoke;
            text-align: center;
            font-weight: bold;
            user-select: none;

            padding: 10px;
            font-size: 25px;
            background: linear-gradient(90deg, #2c3e50 0%, #435e79 100%);
            border: 5px solid #203241;

            &:hover {
                background: linear-gradient(90deg, #445b72 0%, #597693 100%);
                cursor: pointer;
            }
        }
    }
}
</style>
