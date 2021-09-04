<template>
    <div id="game-mode-selection-menu">
        <div
            v-for="(gm, index) in gameModes"
            v-bind:key="index"
            class="gm-box"
            v-bind:class="{selected: index === selectedGameModeIndex}"
            @click="selectGameMode(index)"
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
import {GameModeMenuItem} from "@/interfaces/game-mode";

export default defineComponent({
    name: "GameModeSelectionMenu",
    components: {},
    props: {},
    mounted() {
        // Execute on creation
    },
    data() {
        return {
            selectedGameModeIndex: -1,
            // Todo: Move this info to local json storage when Node fs context bridge is setup
            gameModes: [
                {
                    "title": "Random",
                    "id": "random",
                    "desc": "Challenges or Commands, Civs and Maps are all completely randomized!"
                },
                {
                    "title": "Free Pick",
                    "id": "free",
                    "desc": "Pick your own Challenges, Commands, Civs and the map."
                },
                {
                    "title": "Another Mode",
                    "id": "mode3",
                    "desc": "Some description about this mode to fill the space."
                },
                {
                    "title": "No Commands",
                    "id": "no_commands",
                    "desc": "Just no commands. More PAIN in the challenges!!!!!"
                },
                {
                    "title": "No Challenges",
                    "id": "no_challenges",
                    "desc": "No challenges. Just a bazillion commands. "
                },
            ] as GameModeMenuItem[]
        }
    },
    computed: {
    },
    methods: {
        selectGameMode: function (index: number): void {
            this.selectedGameModeIndex = index;
            this.$store.state.selectedGameMode = this.gameModes[index];
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
