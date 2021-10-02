<template>
    <div id="player-selection">
        <div id="header">Players</div>
        <div id="content">
            <div id="player-list" class="simple-white-scrollbar">
                <div v-for="playerEntry in profileEntries"
                     v-bind:key="playerEntry.name"
                     class="player-entry"
                     @mouseup="playerClicked(playerEntry, $event)"
                     v-bind:class="{
                         challenger: playerEntry.side === Side.CHALLENGER,
                         defendant: playerEntry.side === Side.DEFENDANT,
                         selected: playerEntry.side !== Side.NONE
                     }">
                    <div class="floating-class">
                        {{ playerEntry.side }}
                    </div>
                    {{ playerEntry.name }}
                </div>
            </div>
            <div id="selected-players">
                <div id="defendants">
                    <h5>Defendants</h5>
                    <div class="player-selected-entry"
                         v-for="playerEntry in defendants"
                         v-bind:key="playerEntry.name"
                         @mouseup="playerEntry.side = Side.NONE">
                        {{ playerEntry.name }}
                    </div>
                </div>
                <div id="challengers">
                    <h5>Challengers</h5>
                    <div class="player-selected-entry"
                         v-for="playerEntry in challengers"
                         v-bind:key="playerEntry.name"
                         @mouseup="playerEntry.side = Side.NONE">
                        {{ playerEntry.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

enum Side {
    NONE = "",
    DEFENDANT = "Defendant",
    CHALLENGER = "Challenger"
}

interface PlayerEntry {
    name: string;
    side: Side;
}

export default defineComponent({
    name: "PlayerSelectionMenu",
    components: {},
    props: {},
    mounted() {
        window.fs.getProfileNames().then(names => {
            names.forEach(name => this.profileEntries.push({name: name, side: Side.NONE}))
        });
    },
    data() {
        return {
            profileEntries: [] as PlayerEntry[],
            Side: Side,
        }
    },
    computed: {
        defendants: function (): PlayerEntry[] {
            return this.profileEntries.filter(e => e.side === Side.DEFENDANT)
        },
        challengers: function (): PlayerEntry[] {
            return this.profileEntries.filter(e => e.side === Side.CHALLENGER)
        }
    },
    methods: {
        playerClicked: function (playerEntry: PlayerEntry, event: MouseEvent) {
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

            if (playerEntry.side === side)
                playerEntry.side = Side.NONE
            else
                playerEntry.side = side;
        }
    },
    watch: {}
})
</script>

<style scoped lang="scss">
#player-selection {
    margin: 10px;
    height: 100%;
    overflow-y: hidden;
    box-shadow: 0 3px 10px 1px black;

    #header {
        height: 55px;
        padding: 5px;
        text-align: center;
        border: 2px solid $BORDER_COLOUR;
        margin-bottom: 0;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 0;
        font-size: 36px;
    }

    #content {
        height: calc(100% - 54px);

        #player-list {
            overflow-y: auto;
            height: calc(100% - 200px);
            width: 100%;
            min-height: 70%;
            border: 2px solid $BORDER_COLOUR;
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
                border: 2px solid $BORDER_COLOUR;
                border-top: none;

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
                border-left: none;
            }
        }
    }
}
</style>
