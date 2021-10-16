<template>
    <div id="civ-selection">
        <div class="overlay-block-header">Civs</div>
        <div class="overlay-block-content">
            <div id="civ-list" class="simple-white-scrollbar">
                <div v-for="(civ, index) in selection.civOptions"
                     v-bind:key="civ"
                     class="civ-entry"
                     v-bind:class="{selected: selectedCiv === index}"
                     @click="selectCiv(index)">
                    {{ civ }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {CivSelection} from "@/interfaces/gamemode-overlay";
import {OverlayTab} from "@/enums/gamemode-overlay";
import {getRandomCivs} from "@/scripts/civs";

export default defineComponent({
    name: "CivSelectionMenu",
    components: {},
    props: {
        initialTabData: {
            type: Object as PropType<CivSelection>,
            default: () => { return {} }
        }
    },
    mounted() {
        if (this.initialTabData.civOptions.length > 0) {
            this.selection = this.initialTabData;
            this.selectedCiv = this.selection.civOptions.indexOf(this.selection.civChoice);
        } else {
            this.selection.civOptions = getRandomCivs(1).sort();
            this.selection.civChoice = "";
            
            let valid = false;
            if (this.selection.civOptions.length === 1) {
                this.selection.civChoice = this.selection.civOptions[0];
                this.selectedCiv = 0;
                valid = true;
            }

            this.$emit('overlay-tab-data-update', OverlayTab.CIVS, valid, this.selection);
        }
    },
    data() {
        return {
            civs: [] as string[],
            selectedCiv: -1 as number,
            selection: {} as CivSelection,
        }
    },
    computed: {},
    methods: {
        selectCiv: function(civIndex: number) {
            this.selectedCiv = civIndex;
            this.selection.civChoice = this.selection.civOptions[civIndex];
            this.$emit('overlay-tab-data-update', OverlayTab.CIVS, true, this.selection);
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#civ-selection {
    height: 100%;

    .overlay-block-content {
        #civ-list {
            overflow-y: auto;
            padding: 10px;

            .civ-entry {
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
