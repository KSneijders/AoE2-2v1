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
    NONE,
    DEFENDANT,
    CHALLENGER
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
        playerClicked: function (playerEntry: PlayerEntry, event) {
            let side = undefined
            switch (event.which) {
                case 1:   // LMB
                    side = Side.DEFENDANT;
                    break;
                case 3:  // RMB
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

    #content {
        height: calc(100% - 55px);

        #selected-players {
            height: 40%;

            #defendants, #challengers {
                width: 50%;
                height: 100%;
                border: 2px solid $BORDER_COLOUR;
                border-top: none;

                h5 {
                    padding: 5px;
                    text-align: center;
                    border-bottom: 2px dotted $BORDER_COLOUR;
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

        #player-list {
            overflow-y: auto;
            height: 60%;
            border: 2px solid $BORDER_COLOUR;
            border-top: none;

            .player-entry {
                padding: 10px;
                text-transform: capitalize;
                background: $BLUE_BG_NORMAL;

                &:hover {
                    background: $BLUE_BG_HOVER;
                    cursor: pointer;
                }

                &.defendant {
                    background: $GREEN_BG_NORMAL;

                    &:hover {
                        background: $GREEN_BG_HOVER;
                    }
                }

                &.challenger {
                    background: $RED_BG_NORMAL;
                    text-align: right;

                    &:hover {
                        background: $RED_BG_HOVER;
                    }
                }
            }
        }
    }

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
}
</style>
