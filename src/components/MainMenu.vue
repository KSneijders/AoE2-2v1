<template>
    <div id="main-menu">
        <div id="user-profile">
            <UserProfile/>
        </div>
        <div id="game-mode-selection-wrapper">
            <div id="game-mode-selection">
                <GameModeSelectionMenu/>
            </div>
            <div id="start-button"
                 v-if="gameModeSelected"
                 @click="gameModeStart">
                Start GameMode!
            </div>
        </div>
        <div id="game-overlay-wrapper" v-if="gameModeStarted">
            <div id="game-overlay">
                <GameStartOverlay/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import UserProfile from "@/components/main-menu/UserProfile.vue";
import GameModeSelectionMenu from "@/components/main-menu/GameModeSelectionMenu.vue";
import GameStartOverlay from "@/components/main-menu/GameStartOverlay.vue";
import {mapGetters, mapState} from 'vuex';
import {State} from '@vue/runtime-core';

export default defineComponent({
    name: "MainMenu",
    components: {
        UserProfile,
        GameModeSelectionMenu,
        GameStartOverlay
    },
    props: {},
    mounted() {
        // this.gameModeStart();
    },
    computed: {
        ...mapState({
            gameModeStarted: (state) => (state as State).gameModeInfo.started,
        }),
        ...mapGetters({
            gameModeSelected: 'gameModeSelected'
        })
    },
    methods: {
        gameModeStart (): void {
            this.$store.commit('gameModeStart')
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

    #game-overlay {
        position: fixed;
        top: 10vh;
        left: 10%;
        height: 80vh;
        width: 80%;
    }

    #game-mode-selection-wrapper {
        display: block;
        position: absolute;
        top: 85px;
        right: 50px;
        width: 40%;
        height: 80%;

        #game-mode-selection {
            height: 100%;
        }

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
            background: $BLUE_BG_NORMAL;
            border: 5px solid #203241;

            &:hover {
                background: $BLUE_BG_HOVER;
                cursor: pointer;
            }
        }
    }
}
</style>
