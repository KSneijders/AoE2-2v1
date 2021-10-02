<template>
    <div id="main-menu">
        <div id="user-profile">
            <UserProfile :profile="profile"/>
        </div>
        <div id="game-mode-selection-wrapper">
            <div id="game-mode-selection">
                <GameModeSelectionMenu/>
            </div>
            <div id="start-button"
                 v-if="gameModeSelected"
                 @click="gameModeStart">
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
import GameStartOverlay from "@/components/main-menu/GameStartOverlay.vue";
import {mapGetters, mapState} from 'vuex';
import {State} from '@vue/runtime-core';

export default defineComponent({
    name: "MainMenu",
    components: {UserProfile, GameModeSelectionMenu},
    props: {
        profile: {
            type: Object as PropType<Profile>
        }
    },
    // mounted() {},
    // data() {
    //   // Data
    // },
    computed: {
        ...mapState({
            gameModeStarted: (state) => (state as State).gameModeInfo.started,
        }),
        ...mapGetters({
            gameModeSelected: 'gameModeSelected'
        })
    },
    methods: {
        gameModeStart: function (): void {
            this.$store.commit('gameModeStart')
            // const {challenges, limiters} = await loadGameMode(this.$store.state.gameModeInfo.selectedGameMode.id)
            // const cc = new ChallengeCollection(challenges, limiters, true)
            // const rc = cc.getRandomChallenges()
            // console.log(rc)
        }
    },
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
