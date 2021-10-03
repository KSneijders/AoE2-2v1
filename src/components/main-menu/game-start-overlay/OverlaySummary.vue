<template>
    <div id="summary-wrapper">
        <div class="overlay-block-header">Summary</div>
        <div class="overlay-block-content">
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
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayTabData} from "@/interfaces/other";
import {Side} from "@/enums/other";
import {ProfileEntry} from "@/interfaces/profile";

export default defineComponent({
    name: "OverlaySummary",
    components: {},
    props: {
        tabData: {
            type: Object as PropType<OverlayTabData>,
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
    box-shadow: 0 3px 10px 1px black;
    background: linear-gradient(90deg, #657f9a 0%, #68849f 100%);

    .profiles {
        padding: 10px;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        border-bottom: $BORDER_COLOUR;
        text-align: center;

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
    }
}
</style>
