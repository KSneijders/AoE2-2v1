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
            <div id="exit-button" @click="cancelGameModeStart">x</div>
        </div>
        <div id="overlay-content">
            <div id="summary-block" class="gamemode-box" v-if="currentTab !== tabs.indexOf('players')">
                <OverlaySummary :tabData="tabData"/>
            </div>
            <div id="player-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('players')">
                <PlayerSelectionMenu
                    :initialTabData="tabData.players"
                    :userSwitchConfirmRequired="playerTabSwitchConfirmRequired"
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
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <div id="policy-selection-block" class="gamemode-box" v-if="currentTab === tabs.indexOf('challenges')">
                <ChallengeSelectionMenu
                    :configData="tabData"
                    @overlay-tab-data-update="overlayTabDataUpdate"
                />
            </div>
            <div v-if="tabIsValid(currentTab)" id="next-button" class="gamemode-box" @click="nextTab">
                NEXT!
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters} from 'vuex';
import PlayerSelectionMenu from "@/components/main-menu/game-start-overlay/PlayerSelectionMenu.vue";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import {OverlayConfigData, TabData} from "@/interfaces/gamemode-overlay";
import OverlaySummary from "@/components/main-menu/game-start-overlay/OverlaySummary.vue";
import {range} from "@/scripts/arrays";
import MapSelectionMenu from "@/components/main-menu/game-start-overlay/MapSelectionMenu.vue";
import CivSelectionMenu from "@/components/main-menu/game-start-overlay/CivSelectionMenu.vue";
import ChallengeSelectionMenu from "@/components/main-menu/game-start-overlay/ChallengeSelectionMenu.vue";
import {ProfileEntry} from "@/interfaces/profile";

interface ValidTabs {
    [key: string]: boolean;
}

interface OverLayTabConfig {
    invalid: string[];
    challenger: string[];
    defendant: string[];
}

export default defineComponent({
    name: "GameStartOverlay",
    components: {
        CivSelectionMenu,
        MapSelectionMenu,
        OverlaySummary,
        PlayerSelectionMenu,
        ChallengeSelectionMenu
    },
    props: {},
    data() {
        return {
            tabs: ['players'] as string[],
            validTabs: {} as ValidTabs,
            tabData: {} as OverlayConfigData,
            currentTab: 0 as number,

            tabConfig: {
                invalid: ['players'],
                challenger: ['players', 'maps', 'civs', 'challenges'],
                defendant: ['players', 'maps', 'commands', 'civs'],
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
        }
    },
    methods: {
        resetTabData: function (): void {
            this.tabData = {
                players: [],
                maps: "",
                civs: {civOptions: [], civChoice: ""},
                policies: {challenges: [], commands: []},
                policyRefresh: false,
            }
        },
        nextTab: function (): void {
            if (this.tabIsValid(this.currentTab)) {
                this.currentTab++;
            }
        },
        selectTab: function (tabIndex: number): void {
            if (tabIndex <= this.tabProgress) {
                this.currentTab = tabIndex
            }
        },
        tabIsValid: function (tabIndex: number): boolean {
            return this.validTabs[this.tabs[tabIndex]];
        },
        cancelGameModeStart: function (): void {
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
    border: 5px solid $BORDER_COLOUR;
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

        #policy-selection-block {
            flex-grow: 1;
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
