<template>
    <div id="player-selection">
        <div class="overlay-block-header">Players</div>
        <div class="overlay-block-content">
            <div id="player-list" class="simple-white-scrollbar">
                <div v-for="profileEntry in profileEntries"
                     v-bind:key="profileEntry.name"
                     class="player-entry"
                     @mouseup="playerClicked(profileEntry, $event)"
                     v-bind:class="{
                         challenger: profileEntry.side === Side.CHALLENGER,
                         defendant: profileEntry.side === Side.DEFENDANT,
                         selected: profileEntry.side !== Side.NONE
                     }">
                    <div class="floating-class">
                        {{ profileEntry.side }}
                    </div>
                    {{ profileEntry.name }}
                </div>
            </div>
            <div id="selected-players">
                <div id="defendants">
                    <h5>Defendants</h5>
                    <div class="player-selected-entry"
                         v-for="profileEntry in defendants"
                         v-bind:key="profileEntry.name"
                         @mouseup="profileEntry.side = Side.NONE">
                        {{ profileEntry.name }}
                    </div>
                </div>
                <div id="challengers">
                    <h5>Challengers</h5>
                    <div class="player-selected-entry"
                         v-for="profileEntry in challengers"
                         v-bind:key="profileEntry.name"
                         @mouseup="profileEntry.side = Side.NONE">
                        {{ profileEntry.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayTab, Side} from "@/enums/other";
import {ProfileEntry} from "@/interfaces/profile";

export default defineComponent({
    name: "PlayerSelectionMenu",
    components: {},
    props: {
        initialTabData: {
            type: Array as PropType<ProfileEntry[]>,
            default: () => []
        }
    },
    mounted() {
        // Todo: Get profiles from store
        window.fs.getProfileNames().then(names => {
            names.forEach(name => this.profileEntries.push({name: name, side: Side.NONE}))

            for (const entry of (this.initialTabData || [])) {
                const found = this.profileEntries.find(e => e.name === entry.name)
                if (found) found.side = entry.side
            }
        });
    },
    data() {
        return {
            profileEntries: [] as ProfileEntry[],
            Side: Side,
        }
    },
    computed: {
        defendants: function (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side === Side.DEFENDANT)
        },
        challengers: function (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side === Side.CHALLENGER)
        },
        selectedEntries: function (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side !== Side.NONE)
        },
    },
    methods: {
        playerClicked: function (profileEntry: ProfileEntry, event: MouseEvent) {
            let side = undefined
            switch (event.button) {
                case 0:   // LMB
                    side = Side.DEFENDANT;
                    break;
                case 2:  // RMB
                    side = Side.CHALLENGER;
                    break;
                default:
                    return;
            }

            if (profileEntry.side === side)
                profileEntry.side = Side.NONE
            else
                profileEntry.side = side;

            const valid: boolean = this.isValidSelection()

            this.$emit('overlay-tab-data-update', OverlayTab.PLAYERS, valid, this.selectedEntries)
        },
        isValidSelection: function (): boolean {
            return (this.defendants.length > 0 && this.challengers.length > 0)
        }
    },
    watch: {}
})
</script>

<style scoped lang="scss">
#player-selection {
    height: 100%;
    overflow-y: hidden;
    box-shadow: 0 3px 10px 1px black;

    .overlay-block-content {
        #player-list {
            overflow-y: auto;
            height: calc(100% - 200px);
            width: 100%;
            min-height: 70%;
            border-top: none;

            .player-entry {
                padding: 10px;
                margin: 0 10px;
                text-transform: capitalize;
                background: $BLUE_BG_NORMAL;
                box-shadow: 0 3px 10px 1px black;

                .floating-class {
                    float: left;
                    width: 100%;
                    text-align: center;
                    height: 0;
                }

                &:first-child {
                    margin-top: 10px;
                }

                &:hover {
                    background: $BLUE_BG_HOVER;
                    cursor: pointer;
                }

                &.defendant {
                    background: $GREEN_BG_NORMAL;
                    box-shadow: 0 3px 10px 1px #003000;

                    &:hover {
                        background: $GREEN_BG_HOVER;
                        box-shadow: 0 3px 10px 1px #004100;
                    }
                }

                &.challenger {
                    background: $RED_BG_NORMAL;
                    box-shadow: 0 3px 10px 1px #800000;
                    text-align: right;

                    &:hover {
                        background: $RED_BG_HOVER;
                        box-shadow: 0 3px 10px 1px #b00000;
                    }
                }
            }
        }

        #selected-players {
            max-height: 200px;
            height: 30%;

            #defendants, #challengers {
                width: 50%;
                height: 100%;
                border-top: 2px solid $BORDER_COLOUR;

                h5 {
                    padding: 5px;
                    text-align: center;
                    border-bottom: 2px solid $BORDER_COLOUR;
                    margin: 0;
                }

                .player-selected-entry {
                    padding: 5px 10px;
                    text-transform: capitalize;
                    background: $BLUE_BG_NORMAL;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            #defendants {
                float: left;
            }

            #challengers {
                float: right;
                border-left: 2px solid $BORDER_COLOUR;
            }
        }
    }
}
</style>
