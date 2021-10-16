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
                         @mouseup="playerReset(profileEntry)"
                    >
                        {{ profileEntry.name }}
                    </div>
                </div>
                <div id="challengers">
                    <h5>Challengers</h5>
                    <div class="player-selected-entry"
                         v-for="profileEntry in challengers"
                         v-bind:key="profileEntry.name"
                         @mouseup="playerReset(profileEntry)"
                    >
                        {{ profileEntry.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import {ProfileEntry} from "@/interfaces/profile";
import {ensure} from "@/scripts/arrays";

export default defineComponent({
    name: "PlayerSelectionMenu",
    components: {},
    props: {
        initialTabData: {
            type: Array as PropType<ProfileEntry[]>,
            default: () => []
        },
        userSwitchConfirmRequired: {
            type: Boolean,
            default: () => false
        }
    },
    mounted() {
        window.fs.getProfiles().then(profiles => {
            profiles.forEach(
                profile => this.profileEntries.push({name: profile.name, side: Side.NONE, id:profile.id})
            );

            for (const entry of (this.initialTabData || [])) {
                const found = this.profileEntries.find(e => e.id === entry.id);
                if (found) found.side = entry.side;
            }

            this.userProfile = ensure(this.profileEntries.find(pe => pe.id === 'default'));
            this.userLastSide = this.userProfile.side;
        });
    },
    data() {
        return {
            profileEntries: [] as ProfileEntry[],
            userProfile: {} as ProfileEntry,
            userLastSide: Side.NONE as Side,

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
        changeProfileSide(profileEntry: ProfileEntry, side: Side): void {
            profileEntry.side = side;

            if (profileEntry.id === "default") {
                this.userLastSide = side;
                this.$emit('overlay-tab-reset');
            }
        },
        playerReset: function(profileEntry: ProfileEntry): void {
            if (this.verifyUserSwitch(profileEntry, Side.NONE)) {
                this.changeProfileSide(profileEntry, Side.NONE);
                this.emitPlayerSelectionUpdate();
            }
        },
        playerClicked: function (profileEntry: ProfileEntry, event: MouseEvent): void {
            let side = undefined;
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

            const newSide: Side = profileEntry.side === side ? Side.NONE : side;
            if (this.verifyUserSwitch(profileEntry, newSide)) {
                this.changeProfileSide(profileEntry, newSide);
                this.emitPlayerSelectionUpdate();
            }
        },
        emitPlayerSelectionUpdate: function (): void {
            const valid: boolean = this.isValidSelection();
            this.$emit('overlay-tab-data-update', OverlayTab.PLAYERS, valid, this.selectedEntries);
        },
        isValidSelection: function (): boolean {
            return (this.defendants.length > 0 && this.challengers.length > 0) &&
                this.selectedEntries.filter(pe => pe.id === 'default').length === 1;
        },
        verifyUserSwitch(profileEntry: ProfileEntry, newSide: Side): boolean {
            if (profileEntry.id !== "default") return true;

            let choice = true;
            if (this.userLastSide !== Side.NONE &&
                this.userLastSide !== newSide &&
                this.userSwitchConfirmRequired
            ) choice = confirm("Are you sure you want to switch teams? This will discard all overlay progress.");

            return choice
        },
    },
    watch: {}
})
</script>

<style scoped lang="scss">
#player-selection {
    height: 100%;
    overflow-y: hidden;

    .overlay-block-content {
        #player-list {
            overflow-y: auto;
            padding: 10px;
            height: calc(100% - 200px);
            width: 100%;
            min-height: 70%;
            border-top: none;

            .player-entry {
                padding: 10px;
                text-transform: capitalize;
                background: $BLUE_BG_NORMAL;
                box-shadow: 0 3px 10px 1px black;

                .floating-class {
                    float: left;
                    width: 100%;
                    text-align: center;
                    height: 0;
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
