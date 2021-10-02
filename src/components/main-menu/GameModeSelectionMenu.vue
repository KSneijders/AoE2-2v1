<template>
    <div id="game-mode-selection-menu" class="simple-white-scrollbar">
        <div v-for="(gm, key) in gameModes"
             v-bind:key="key"
             v-bind:class="{selected: key === selectedGameModeKey}"
             @click="selectGameMode(key)"
             class="gm-box"
        >
            <div class="gm-title">
                <b>{{ gm.title }}</b>
            </div>
            <div class="gm-body">
                {{ gm.desc }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {GameModes} from "@/data/gamemodes";
import {GameModeMenuItem} from "@/interfaces/game-mode";

export default defineComponent({
    name: "GameModeSelectionMenu",
    components: {},
    props: {},
    mounted() {
        if (this.$store.getters.gameModeSelected) {
            this.selectedGameModeKey = this.$store.getters.selectedGameModeId
        } else {
            this.selectGameMode("random");
        }
    },
    data() {
        return {
            selectedGameModeKey: "" as string,
        }
    },
    computed: {
        gameModes: function (): Record<string, GameModeMenuItem> {
            return GameModes;
        }
    },
    methods: {
        selectGameMode: function (key: string): void {
            if (this.selectedGameModeKey === key) key = "";
            this.selectedGameModeKey = key;
            this.$store.commit('selectGameMode', GameModes[key])
        },
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#game-mode-selection-menu {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    color: whitesmoke;
    padding: 10px;
    background: $LIGHT_BLUE_BG;
    border: 5px solid #203241;
    user-select: none;

    .gm-box {
        width: 80%;
        margin: 0 0 5px 0;
        border: 2px solid #7696b6;
        padding: 10px;
        background: $BLUE_BG_NORMAL;
        transition: width .25s;

        .gm-body {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &:hover {
            background: $BLUE_BG_HOVER;
            border: 2px solid #b5c4d9;
            cursor: pointer;
            width: 90%;
        }

        .gm-title {
            padding: 10px 0;
            font-size: 25px;
        }

        &.selected {
            background: $GREEN_BG_NORMAL;

            &:hover {
                background: $GREEN_BG_HOVER;
            }
        }
    }
}
</style>
