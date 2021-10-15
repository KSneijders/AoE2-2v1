<template>
    <div id="summary-wrapper">
        <div class="overlay-block-header">Summary</div>
        <div class="overlay-block-content">
            <div id="player-summary" class="summary-entry">
                <h5>Players</h5>
                <div class="vs">VS</div>
                <div class="profiles">
                    <div class="profile-header">Defendants</div>
                    <div v-for="profile in defendants" v-bind:key="profile.name" class="profile-entry">
                        {{ profile.name }}
                    </div>
                </div>
                <div class="profiles">
                    <div class="profile-header">Challengers</div>
                    <div v-for="profile in challengers" v-bind:key="profile.name" class="profile-entry">
                        {{ profile.name }}
                    </div>
                </div>
            </div>
            <div id="map-summary" class="summary-entry" v-if="tabData.maps">
                <h5>Map</h5>
                <p>{{ tabData.maps }}</p>
            </div>
            <div id="civ-summary" class="summary-entry" v-if="tabData.civs.civChoice !== ''">
                <h5>Civ</h5>
                <p>{{ tabData.civs.civChoice }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {Side} from "@/enums/gamemode-overlay";
import {ProfileEntry} from "@/interfaces/profile";

export default defineComponent({
    name: "OverlaySummary",
    components: {},
    props: {
        tabData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => {return {}}
        }
    },
    mounted() {
        // Execute on creation
    },
    // data() {},
    computed: {
        defendants: function (): ProfileEntry[] {
            return this.tabData?.players.filter(e => e.side === Side.DEFENDANT)
        },
        challengers: function (): ProfileEntry[] {
            return this.tabData?.players.filter(e => e.side === Side.CHALLENGER)
        },
    },
    methods: {},
    watch: {}
})
</script>

<style scoped lang="scss">
#summary-wrapper {
    height: 100%;
    overflow-y: hidden;

    .summary-entry {
        border-bottom: 2px solid $BORDER_COLOUR;
        text-align: center;

        h5 {
            padding-top: 5px;
            font-weight: bold;
            text-transform: uppercase;
            text-shadow: 2px 2px 5px black;
        }

        p {
            text-transform: capitalize;
        }
    }

    #map-summary, #civ-summary {}

    #player-summary {
        .profiles {
            padding: 10px;
            display: inline-block;
            vertical-align: top;
            width: 50%;

            .profile-header {
                font-weight: bold;
            }

            .profile-entry {
                text-transform: capitalize;
                padding: 5px 0 0 10px;
            }
        }

        .vs {
            float: left;
            font-size: 30px;
            width: 100%;
            text-align: center;
            height: 0;
            text-shadow: 2px 2px 5px black;
        }
    }

}
</style>
