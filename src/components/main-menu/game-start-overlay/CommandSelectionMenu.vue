<template>
    <div id="command-selection">
        <div class="overlay-block-header">Commands</div>
        <div class="overlay-block-content">
            <div id="reroll-button" @click="clickedReroll" v-bind:class="{'out-of-rolls': this.commands.rerolls === 0}">
                Reroll Commands ({{ commands.rerolls }})
            </div>
            <div id="command-list" class="simple-white-scrollbar">
                <div v-for="command in commands.collection" v-bind:key="command.id">
                    {{ command.name }}
                    <span v-if="typeof command.points === 'object'">
                        ({{ command.selectedOption }})
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {CommandData, OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import {sum} from "@/scripts/arrays";
import {Profile} from "@/interfaces/profile";
import CommandCollection from "@/classes/command-collection";
import {GameModeContent} from "@/interfaces/game-mode";

export default defineComponent({
    name: "CommandSelectionMenu",
    components: {},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    async mounted() {
        const gmc: GameModeContent = this.$store.state.gameModeInfo.content;
        const defendantProfileEntries = this.configData?.players.filter(p => p.side === Side.DEFENDANT);
        const defendantProfiles: Profile[] = await window.fs.getProfiles(defendantProfileEntries.map(pe => pe.id));

        if (this.configData?.commands?.collection.length === 0) {
            const points = sum(defendantProfiles.map(p => p.points)) / defendantProfiles.length;
            this.commands.cc = new CommandCollection(gmc.commands, points, true);
            this.commands.collection = this.commands.cc.getRandomCommands();
            this.commands.rerolls = 3;
        } else {
            this.commands = this.configData?.commands || {collection: [], rerolls: 0};
        }

        console.log(this.commands)

        this.updateTabData(true);
    },
    data() {
        return {
            commands: {} as CommandData,
        }
    },
    computed: {},
    methods: {
        clickedReroll: function (): void {
            if (this.commands.cc && this.commands.rerolls > 0) {
                this.commands.collection = this.commands.cc.reroll();
                this.commands.rerolls--;
                this.updateTabData(true);
            }
        },
        updateTabData: function (valid = true): void {
            this.$emit('overlay-tab-data-update', OverlayTab.COMMANDS, valid, this.commands)
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">


#command-selection {
    height: 100%;
    width: 100%;
    overflow-y: hidden;

    .overlay-block-content {
        width: 100%;

        #reroll-button {
            margin: 5px;
            float: right;
            padding: 5px;
            background: $GREEN_BG_NORMAL;
            border: 1px solid #7696b6;

            user-select: none;

            &:hover {
                background: $GREEN_BG_HOVER;
                border: 1px solid #96b3d0;
                cursor: pointer;
            }

            &.out-of-rolls {
                background: $RED_BG_NORMAL;

                &:hover {
                    background: $RED_BG_HOVER;
                }
            }
        }

        #command-list {
            overflow-y: auto;
            padding: 10px;
            width: 100%;
        }
    }
}
</style>
