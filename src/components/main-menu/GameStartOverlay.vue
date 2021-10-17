<template>
    <div id="overlay-wrapper">
        <div id="block-click-layer" @click="cancelGameModeStart"></div>
        <div id="overlay-header">
            <b>{{ gamemodeName }}</b>
            <span v-for="(tab, index) in tabs" v-bind:key="tab">
                <b> | </b>
                <span class="tab-button"
                      v-bind:class="{disabled: index > tabProgress, active: index === currentTab}"
                      @click="selectTab(index)"
                >
                    {{ tab }}
                </span>
            </span>
            <div id="exit-button" @click="cancelGameModeStart" v-if="tabs[currentTab] !== 'final'">x</div>
        </div>
        <div id="overlay-content">
            <div id="summary-block" class="gamemode-box"
                 v-if="currentTab !== tabs.indexOf('players') && currentTab !== tabs.indexOf('final')">
                <OverlaySummary :tabData="tabData"/>
            </div>
            <div id="player-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('players')">
                <ProfileSelectionMenu
                    :initialTabData="tabData.players"
                    :switchConfirmRequired="playerTabSwitchConfirmRequired"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                    @overlay-tab-reset="resetTabData"
                />
            </div>
            <div id="map-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('maps')">
                <MapSelectionMenu
                    :initialTabData="tabData.maps"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <div id="civ-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('civs')">
                <CivSelectionMenu
                    :initialTabData="tabData.civs"
                    :userProfile="userProfile"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <div id="challenge-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('challenges')">
                <ChallengeSelectionMenu
                    :configData="tabData"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <div id="command-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('commands')">
                <CommandSelectionMenu
                    :configData="tabData"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <!-- ############### FINAL VIEWS ############### -->
            <div id="final-view" v-if="currentTab === tabs.indexOf('final')">
                <div id="defendant-final-view" class="gamemode-box" v-if="userProfile.side === Side.DEFENDANT">
                    <DefendantFinalView
                        :configData="tabData"
                    />
                </div>
                <div id="challenger-final-view" class="gamemode-box" v-if="userProfile.side === Side.CHALLENGER">
                    <ChallengerFinalView
                        :configData="tabData"
                    />
                </div>
            </div>
            <div v-if="tabIsValid(currentTab)" id="next-button" class="gamemode-box" @click="nextTab">
                {{ currentTab + 1 !== tabs.indexOf('final') ? 'NEXT!' : 'FINISH!' }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from 'vuex';
import ProfileSelectionMenu from "@/components/main-menu/game-start-overlay/ProfileSelectionMenu.vue";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import {ChallengeData, CommandData, OverlayConfigData, TabData} from "@/interfaces/gamemode-overlay";
import OverlaySummary from "@/components/main-menu/game-start-overlay/OverlaySummary.vue";
import {range} from "@/scripts/arrays";
import MapSelectionMenu from "@/components/main-menu/game-start-overlay/MapSelectionMenu.vue";
import CivSelectionMenu from "@/components/main-menu/game-start-overlay/CivSelectionMenu.vue";
import ChallengeSelectionMenu from "@/components/main-menu/game-start-overlay/ChallengeSelectionMenu.vue";
import {ProfileEntry} from "@/interfaces/profile";
import CommandSelectionMenu from "@/components/main-menu/game-start-overlay/CommandSelectionMenu.vue";
import {getDefaultPolicyData} from "@/scripts/policies";
import DefendantFinalView from "@/components/main-menu/game-start-overlay/final-view/DefendantFinalView.vue";
import ChallengerFinalView from "@/components/main-menu/game-start-overlay/final-view/ChallengerFinalView.vue";
import {calculatePoints} from "@/scripts/points";

interface ValidTabs {
    [key: string]: boolean;
}

interface OverLayTabConfig {
    invalid: string[];
    challenger: string[];
    defendant: string[];
    final: string[];
}

export default defineComponent({
    name: "GameStartOverlay",
    components: {
        CivSelectionMenu,
        MapSelectionMenu,
        OverlaySummary,
        ProfileSelectionMenu,
        ChallengeSelectionMenu,
        CommandSelectionMenu,
        DefendantFinalView,
        ChallengerFinalView,
    },
    props: {},
    data() {
        return {
            Side: Side, // For in-template reference

            tabs: ['players'] as string[],
            validTabs: {} as ValidTabs,
            tabData: {} as OverlayConfigData,
            currentTab: 0 as number,

            tabConfig: {
                invalid: ['players'],
                challenger: ['players', 'maps', 'civs', 'challenges', 'final'],
                defendant: ['players', 'maps', 'commands', 'civs', 'final'],
                final: ['final'],
            } as OverLayTabConfig,
        }
    },
    mounted() {
        this.tabs.forEach(tab => this.validTabs[tab] = false);
        this.resetTabData();
    },
    computed: {
        ...mapGetters({
            gamemodeName: 'selectedGameModeTitle'
        }),
        tabProgress: function (): number {
            let progress = 0;
            for (const i of range(this.tabs.length)) {
                if (!this.tabIsValid(i)) return progress;
                progress++;
            }
            return progress;
        },
        playerTabSwitchConfirmRequired: function (): boolean {
            return (this.tabData.maps !== "");
        },
        userProfile: function (): ProfileEntry | undefined {
            return this.tabData.players.find(pe => pe.id === 'default');
        }
    },
    methods: {
        resetTabData: function (): void {
            this.tabs.forEach(tab => this.validTabs[tab] = false);
            this.tabData = {
                players: [],
                maps: "",
                points: 0,
                civs: {options: [], choiceIndex: -1},
                challenges: getDefaultPolicyData() as ChallengeData,
                commands: getDefaultPolicyData() as CommandData,
            }
        },
        nextTab: function (): void {
            if (this.tabIsValid(this.currentTab)) {
                this.selectTab(this.currentTab + 1);
            }
        },
        selectTab: function (tabIndex: number): void {
            if (tabIndex <= this.tabProgress) {
                if (this.tabs[tabIndex] === "final" && this.tabs[this.currentTab] !== "final") {
                    // if (!confirm("No changing after this!")) return;

                    this.tabs = this.tabConfig.final;
                    tabIndex = 0;
                }

                this.currentTab = tabIndex
            }
        },
        tabIsValid: function (tabIndex: number): boolean {
            return this.validTabs[this.tabs[tabIndex]];
        },
        cancelGameModeStart: function (): void {
            if (this.tabs[this.currentTab] === 'final') return;

            if (confirm("Are you sure you want to exit gamemode setup?\nAll progress will be lost."))
                this.$store.commit('gameModeEnd')
        },
        overlayTabDataUpdate: function (tab: string, valid: boolean, payload: TabData): void {
            const ltab: string = tab.toLowerCase();

            if (tab === OverlayTab.PLAYERS) {
                const userProfile: ProfileEntry | undefined = (payload as ProfileEntry[]).find(p => p.id === 'default');

                switch (userProfile?.side) {
                    case Side.CHALLENGER:
                        this.tabs = this.tabConfig.challenger;
                        break;
                    case Side.DEFENDANT:
                        this.tabs = this.tabConfig.defendant;
                        break;
                    case Side.NONE:
                    case undefined:
                        this.tabs = this.tabConfig.invalid;
                        break;
                }

                if (valid) calculatePoints((payload as ProfileEntry[])).then(points => this.tabData.points = points);
            }
            this.validTabs[ltab] = valid;
            this.tabData[ltab] = payload;
        }
    },
    watch: {}
})
</script>

<style scoped lang="scss">
#block-click-layer {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    z-index: -1;
}

#overlay-wrapper {
    height: 100%;
    width: 100%;
    background: $LIGHT_BLUE_BG;
    border: 5px solid $BLUE_BORDER_COLOUR;
    border-radius: 5px;
    color: whitesmoke;
    z-index: 0;

    #overlay-content {
        height: 100%;
        display: flex;
        align-items: stretch;

        .gamemode-box {
            height: calc(100% - 70px);
            margin: 10px;
            background: linear-gradient(90deg, #657f9a 0%, #68849f 100%);
            box-shadow: 0 3px 10px 1px black;
            border: 2px solid #203241;
        }

        #summary-block {
            width: 25%;
        }

        #player-selection-block {
            width: 30%;
        }

        #map-selection-block {
            width: 30%;
        }

        #civ-selection-block {
            width: 30%;
        }

        #challenge-selection-block, #command-selection-block {
            width: 50%;
        }

        #final-view {
            flex-grow: 1;

            #defendant-final-view, #challenger-final-view {
                width: calc(100% - 20px);
            }
        }

        #next-button {
            flex-grow: 1;
            text-align: center;
            color: #000;
            font-size: 50px;

            &:hover {
                cursor: pointer;
                color: #fff;
                background-color: rgba(0, 0, 0, .2);
            }
        }
    }

    #overlay-header {
        padding: 5px;
        font-size: 24px;
        border-bottom: 4px solid #203241;
        user-select: none;

        .tab-button {
            padding: 2px 10px;
            border: 1px solid #7696b6;
            background: $BLUE_BG_NORMAL;
            text-transform: capitalize;

            &:hover {
                cursor: pointer;
                border: 1px solid #96b3d0;
                background: $BLUE_BG_HOVER;
            }

            &.disabled {
                color: gray;

                &:hover {
                    cursor: not-allowed;
                }
            }

            &.active {
                background: $GREEN_BG_NORMAL;

                &:hover {
                    background: $GREEN_BG_HOVER;
                }
            }
        }

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
