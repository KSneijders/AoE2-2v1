<template>
    <div id="game-mode-selection-menu">
        <div
            v-for="(gm, key) in gameModes"
            v-bind:key="key"
            class="gm-box"
            v-bind:class="{selected: key === selectedGameModeKey}"
            @click="selectGameMode(key)"
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
        if (this.$store.state.selectedGameMode.id) {
            this.selectedGameModeKey = GameModes[this.$store.state.selectedGameMode.id].id
        } else {
            this.selectGameMode(this.selectedGameModeKey);
        }
    },
    data() {
        return {
            selectedGameModeKey: "random" as string,
        }
    },
    computed: {
        gameModes: function (): Record<string, GameModeMenuItem> {
            return GameModes;
        }
    },
    methods: {
        selectGameMode: function (key: string): void {
            this.selectedGameModeKey = key;
            this.$store.state.selectedGameMode = GameModes[key];
        },
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#game-mode-selection-menu {
    width: 100%;
    height: 300px;
    overflow-y: auto;
    color: whitesmoke;
    padding: 10px;
    background: linear-gradient(90deg, #8ba5be 0%, #9db6d0 100%);
    border: 5px solid #203241;

    .gm-box {
        width: 80%;
        height: 80px;
        margin: 0 0 5px 0;
        border: 2px solid #7696b6;
        padding: 10px;
        background: linear-gradient(90deg, #2c3e50 0%, #435e79 100%);
        transition: width .25s;

        &:hover {
            background: linear-gradient(90deg, #445b72 0%, #597693 100%);
            border: 2px solid #b5c4d9;
            cursor: pointer;
            width: 90%;
        }

        .gm-title {
            padding: 10px 0;
            font-size: 25px;
        }

        &.selected {
            background: linear-gradient(90deg, #2c5039 0%, #527943 100%);

            &:hover {
                background: linear-gradient(90deg, #447245 0%, #618f5b 100%);
            }
        }
    }

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ffffff;
    }
}
</style>
