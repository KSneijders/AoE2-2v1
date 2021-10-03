<template>
    <div id="map-selection">
        <div class="overlay-block-header">Maps</div>
        <div class="overlay-block-content">
            <div id="map-list" class="simple-white-scrollbar">
                <div v-for="(map, index) in maps"
                     v-bind:key="map"
                     class="map-entry"
                     v-bind:class="{selected: selectedMap === index}"
                     @click="selectMap(index)">
                    {{ map }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayTab} from "@/enums/gamemode-overlay";

export default defineComponent({
    name: "MapSelectionMenu",
    components: {},
    props: {
        initialTabData: {
            type: String as PropType<string>,
            default: () => ""
        }
    },
    mounted() {
        let maps = this.$store.state.gameModeInfo.content.maps;
        if (maps.length === 0) maps = this.$store.state.defaultGamemode.maps;
        this.maps = maps;

        if (this.initialTabData) this.selectedMap = this.maps.indexOf(this.initialTabData)
    },
    data() {
        return {
            maps: [] as string[],
            selectedMap: -1 as number,
        }
    },
    computed: {},
    methods: {
        selectMap(index: number): void {
            this.selectedMap = index;
            this.$emit('overlay-tab-data-update', OverlayTab.MAPS, true, this.maps[index])
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#map-selection {
    height: 100%;

    .overlay-block-content {
        #map-list {
            overflow-y: auto;
            padding: 10px;

            .map-entry {
                padding: 10px;
                text-transform: capitalize;
                background: $BLUE_BG_NORMAL;
                box-shadow: 0 3px 10px 1px black;

                &:hover {
                    background: $BLUE_BG_HOVER;
                    cursor: pointer;
                }

                &.selected {
                    background: $GREEN_BG_NORMAL;

                    &:hover {
                        background: $GREEN_BG_HOVER;
                    }
                }
            }
        }
    }
}
</style>
