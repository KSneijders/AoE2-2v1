<template>
    <div id="overlay-wrapper">
        <div id="block-click-layer" @click="cancelGameModeStart"></div>
        <div id="overlay-header">
            <b>{{ gamemodeName }}</b>
            <div id="exit-button" @click="cancelGameModeStart">x</div>
        </div>
        <div id="player-selection-block" class="gamemode-box">
            <PlayerSelectionMenu/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from 'vuex';
import PlayerSelectionMenu from "@/components/main-menu/game-start-overlay/PlayerSelectionMenu.vue";

export default defineComponent({
    name: "GameStartOverlay",
    components: {
        PlayerSelectionMenu
    },
    props: {},
    mounted() {
        // Execute on creation
    },
    // data() {
    //     // Data
    // },
    computed: {
        ...mapGetters({
            gamemodeName: 'selectedGameModeTitle'
        })
    },
    methods: {
        cancelGameModeStart: function (): void {
            if (confirm("Are you sure you want to exit gamemode setup?\nAll progress will be lost."))
                this.$store.commit('gameModeEnd')
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#block-click-layer{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: -1;
}

#overlay-wrapper {
    height: 100%;
    width: 100%;
    background: $LIGHT_BLUE_BG;
    border: 5px solid $BORDER_COLOUR;
    border-radius: 5px;
    color: whitesmoke;
    z-index: 0;

    .gamemode-box {
        height: calc(100% - 70px);
    }

    #player-selection-block {
        width: 30%;
    }

    #overlay-header {
        padding: 5px;
        font-size: 24px;
        border-bottom: 4px solid #203241;

        #exit-button {
            color: red;
            float: right;
            font-family: monospace;
            font-size: 30px;
            padding: 0;
            margin-top: -5px;
            margin-right: 5px;
            vertical-align: center;
            user-select: none;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
