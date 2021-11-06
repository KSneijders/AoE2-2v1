<template>
    <div id="profile-selection">
        <div class="overlay-block-header">Profiles</div>
        <div class="overlay-block-content">
            <div id="profile-list" class="simple-white-scrollbar">
                <div v-for="profileEntry in profileEntries"
                     v-bind:key="profileEntry.name"
                     class="profile-entry"
                     @mouseup="profileClicked(profileEntry, $event)"
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
            <div id="selected-profiles">
                <div id="defendants">
                    <h5>Defendants</h5>
                    <div class="profile-selected-entry"
                         v-for="profileEntry in defendants"
                         v-bind:key="profileEntry.name"
                         @mouseup="profileReset(profileEntry)"
                    >
                        {{ profileEntry.name }}
                    </div>
                </div>
                <div id="challengers">
                    <h5>Challengers</h5>
                    <div class="profile-selected-entry"
                         v-for="profileEntry in challengers"
                         v-bind:key="profileEntry.name"
                         @mouseup="profileReset(profileEntry)"
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
    name: "ProfileSelectionMenu",
    components: {},
    emits: ['overlay-tab-data-update', 'overlay-tab-reset'],
    props: {
        initialTabData: {
            type: Array as PropType<ProfileEntry[]>,
            default: () => []
        },
        switchConfirmRequired: {
            type: Boolean,
            default: () => false
        }
    },
    mounted() {
        window.fs.getProfiles().then(profiles => {
            profiles.forEach(
                profile => this.profileEntries.push({
                    name: profile.name,
                    side: Side.NONE,
                    id: profile.id,
                    colour: profile.colour
                })
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
        defendants (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side === Side.DEFENDANT)
        },
        challengers (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side === Side.CHALLENGER)
        },
        selectedEntries (): ProfileEntry[] {
            return this.profileEntries.filter(e => e.side !== Side.NONE)
        },
    },
    methods: {
        profileReset(profileEntry: ProfileEntry): void {
            this.handleProfileChange(profileEntry, Side.NONE);
        },
        profileClicked (profileEntry: ProfileEntry, event: MouseEvent): void {
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
            this.handleProfileChange(profileEntry, newSide);
        },
        handleProfileChange(profileEntry: ProfileEntry, newSide: Side): void {
            const choice = this.verifyUserSwitch(profileEntry, newSide);
            if (choice === true || choice === undefined) {
                profileEntry.side = newSide;

                if (choice) this.$emit('overlay-tab-reset');
                if (profileEntry.id === "default") this.userLastSide = newSide;

                this.emitProfileSelectionUpdate();
            }
        },
        emitProfileSelectionUpdate (): void {
            const valid: boolean = this.isValidSelection();
            this.$emit('overlay-tab-data-update', OverlayTab.PLAYERS, valid, this.selectedEntries);
        },
        isValidSelection (): boolean {
            return (this.defendants.length > 0 && this.challengers.length > 0) &&
                this.selectedEntries.filter(pe => pe.id === 'default').length === 1;
        },
        verifyUserSwitch(profileEntry: ProfileEntry, newSide: Side): boolean | undefined {
            const profileIsUser: boolean = profileEntry.id === "default";
            const userWasNotNone: boolean = this.userLastSide !== Side.NONE;
            const switchInvolvesDefendant: boolean = newSide === Side.DEFENDANT || profileEntry.side === Side.DEFENDANT;

            if (((profileIsUser && userWasNotNone) || switchInvolvesDefendant) && this.switchConfirmRequired) {
                return confirm("The team change you're about to make will impact the upcoming tabs.\n" +
                    "If you continue, all non-player configuration tabs will get reset!");
            }
        },
    },
    watch: {}
})
</script>

<style scoped lang="scss">
#profile-selection {
    height: 100%;
    overflow-y: hidden;

    .overlay-block-content {
        #profile-list {
            overflow-y: auto;
            padding: 10px;
            height: calc(100% - 200px);
            width: 100%;
            min-height: 70%;
            border-top: none;

            .profile-entry {
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

        #selected-profiles {
            max-height: 200px;
            height: 30%;

            #defendants, #challengers {
                width: 50%;
                height: 100%;
                border-top: 2px solid $BLUE_BORDER_COLOUR;

                h5 {
                    padding: 5px;
                    text-align: center;
                    border-bottom: 2px solid $BLUE_BORDER_COLOUR;
                    margin: 0;
                }

                .profile-selected-entry {
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
                border-left: 2px solid $BLUE_BORDER_COLOUR;
            }
        }
    }
}
</style>
