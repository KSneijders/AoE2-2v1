<template>
    <div id="game-end">
        <div class="overlay-block-header">Game Result</div>
        <div class="overlay-block-content">
            <div id="side-selection">
                <div id="side-defendants" v-bind:class="{'user-side': userSide === Side.DEFENDANT}"
                     @click="clickedSide(Side.DEFENDANT)">
                    Defendants won!<br>
                    You {{ userSide === Side.DEFENDANT ? 'Won!' : 'Lost :('}}
                </div>
                <div id="side-challengers" v-bind:class="{'user-side': userSide === Side.CHALLENGER}"
                     @click="clickedSide(Side.CHALLENGER)">
                    Challengers won!<br>
                    You {{ userSide === Side.CHALLENGER ? 'Won!' : 'Lost :('}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {ensure} from "@/scripts/arrays";
import {Side} from "@/enums/gamemode-overlay";

export default defineComponent({
    name: "GameEndView",
    components: {},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    data() {
        return {
            Side: Side
        }
    },
    computed: {
        userSide(): Side {
            return ensure(this.configData?.players.find((pe) => pe.id === this.$store.state.user.id)).side;
        }
    },
    methods: {
        clickedSide(side: Side): void {
            const pointAdjust: number = side === Side.DEFENDANT ? +1 : -1;
            this.configData?.players.filter(p => p.side === Side.DEFENDANT).forEach(p => {
                window.fs.adjustProfilePoints(p.id, pointAdjust);
            });
            this.$store.commit('gameModeEnd');
        }
    }
})
</script>

<style scoped lang="scss">

#game-end {
    height: 100%;

    .overlay-block-content {
        #side-selection {
            height: 100%;

            #side-defendants, #side-challengers {
                width: 50%;
                height: 100%;
                text-align: center;
                padding-top: 25vh;
                display: inline-block;
                background: $RED_BG_NORMAL;
                font-size: 40px;
                user-select: none;

                &:hover {
                    cursor: pointer;

                    background: $RED_BG_HOVER;
                }

                &.user-side {
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
