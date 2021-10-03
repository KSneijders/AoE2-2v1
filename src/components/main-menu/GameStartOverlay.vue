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
import {OverlayTab} from "@/enums/other";
import {OverlayTabData, TabData} from "@/interfaces/other";
import OverlaySummary from "@/components/main-menu/game-start-overlay/OverlaySummary.vue";
import {range} from "@/scripts/arrays";

interface ValidTabs {
    [key: string]: boolean;

    Players: boolean;
    Maps: boolean;
    Civs: boolean;
    Policies: boolean;
}

export default defineComponent({
    name: "GameStartOverlay",
    components: {
        OverlaySummary,
        PlayerSelectionMenu
    },
    props: {},
    mounted() {
        for (const tab of this.tabs) {
            this.validTabs[tab] = false;
        }
    },
    data() {
        return {
            OverlayTab: OverlayTab,
            currentTab: 0 as number,
            tabs: ["players", "maps", "civs", "policies"] as string[],
            validTabs: {} as ValidTabs,
            tabData: {
                players: []
            } as OverlayTabData
        }
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
            return progress
        }
    },
    methods: {
        nextTab: function (): void {
            if (this.tabIsValid(this.currentTab)) {
                this.currentTab++;
            }
        },
        selectTab: function (tabIndex: number): void {
            if (this.tabIsValid(tabIndex) || this.tabProgress === tabIndex) {
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
            tab = tab.toLowerCase();
            this.validTabs[tab] = valid;
            this.tabData[tab] = payload;
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
        }

        #summary-block {
            width: 25%;
        }

        #player-selection-block {
            width: 30%;
        }

        #next-button {
            flex-grow: 1;
            text-align: center;
            padding: 20%;
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
