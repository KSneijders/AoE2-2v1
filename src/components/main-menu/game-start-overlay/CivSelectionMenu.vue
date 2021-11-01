<template>
    <div id="civ-selection">
        <div class="overlay-block-header">Civs</div>
        <div class="overlay-block-content">
            <div id="civ-list" class="simple-white-scrollbar">
                <div v-for="(civ, index) in selection.options"
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
import {Options} from "@/interfaces/gamemode-overlay";
import {OverlayTab} from "@/enums/gamemode-overlay";
import {getRandomCivs} from "@/scripts/civs";
import {ProfileEntry} from "@/interfaces/profile";

interface ChoiceCount {
    [key: string]: number;

    challenger: number;
    defendant: number;
}

export default defineComponent({
    name: "CivSelectionMenu",
    components: {},
    emits: ['overlay-tab-data-update', 'overlay-tab-reset'],
    props: {
        initialTabData: {
            type: Object as PropType<Options<string>>,
            default: () => new Object()
        },
        userProfile: {
            type: Object as PropType<ProfileEntry>,
            default: () => new Object()
        },
        switchConfirmRequired: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            choiceCount: {
                challenger: 1,
                defendant: 3,
            } as ChoiceCount,
            selectedCiv: -1 as number,
            selection: {} as Options<string>,
        }
    },
    mounted() {
        const choiceCount: number = this.choiceCount[this.userProfile.side.toLowerCase()];

        if (this.initialTabData?.options.length > 0) {
            this.selection = this.initialTabData;
            this.selectedCiv = this.selection.choiceIndex;
        } else {
            this.selection.options = getRandomCivs(choiceCount).sort();
            this.selection.choiceIndex = -1;
            
            if (this.selection.options.length === 1) {
                this.selection.choiceIndex = this.selectedCiv = 0;
            }

            this.$emit('overlay-tab-data-update', OverlayTab.CIVS, this.selection.choiceIndex !== -1, this.selection);
        }
    },
    computed: {},
    methods: {
        selectCiv(civIndex: number) {
            if (this.switchConfirmRequired && this.selectedCiv !== civIndex) {
                if (!confirm("The civ change you're about to make will impact the upcoming tabs.\n" +
                    "If you continue, all upcoming configuration tabs will get reset!")) {
                    return;
                } else {
                    this.$emit('overlay-tab-reset');
                }
            }

            this.selectedCiv = this.selection.choiceIndex = civIndex;
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
