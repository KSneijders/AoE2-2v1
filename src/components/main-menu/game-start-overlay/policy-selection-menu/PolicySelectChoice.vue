<template>
    <div class="simple-white-scrollbar">
        <div class="option-block"
             v-for="(option, index) in sorted"
             v-bind:key="index"
             v-bind:class="{selected: index === selectedOption}"
             @click="clickedChoice(index)"
        >
            <div id="policy-list" class="simple-white-scrollbar">
                <table>
                    <tr v-for="policy in option" v-bind:key="policy.id">
                        <td>
                            <img v-bind:src="images['./instant.png']" v-if="policy?.classes?.includes('instant')">
                            <img v-bind:src="images['./dark.png']" v-if="policy?.classes?.includes('dark')">
                            <img v-bind:src="images['./feudal.png']" v-if="policy?.classes?.includes('feudal')">
                            <img v-bind:src="images['./castle.png']" v-if="policy?.classes?.includes('castle')">
                        </td>
                        <td>
                            <span class="name" v-bind:class="{'game-changing': policy?.classes?.includes('game-changing')}">
                                {{ policy.name }}
                            </span>
                            <span style="min-width: 80px; display: inline-block">
                                {{ policy?.selectedOption ? `(${policy.selectedOption})` : '' }}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData, Options} from "@/interfaces/gamemode-overlay";
import {Challenge, Command} from "@/interfaces/policies";
import {range} from "@/scripts/arrays";
import {importImages, sleep} from "@/scripts/other";
import {sortChallenges, sortCommands} from "@/scripts/policies";

const images: Record<string, string> = importImages(
    require.context('/src/assets/images/', false, /\.(jpg|jpe?g|png|gif|webp)$/)
) as Record<string, string>;

export default defineComponent({
    name: "PolicySelectChoice",
    components: {},
    emits: ['options'],
    props: {
        policies: {
            type: Object as PropType<CommandData | ChallengeData>,
            default: () => new Object()
        },
        policyType: {
            type: String as PropType<string>,
            default: () => ""
        }
    },
    data() {
        return {
            images: images,

            options: {options: [], choiceIndex: -1} as Options<Command[] | Challenge[]>,
            selectedOption: -1 as number,
        }
    },
    async mounted() {
        while (!this.policies?.cc) await sleep(20);

        if (this.policies.options.options.length === 0) {
            this.options.options = [];

            range(this.policies.quantity).forEach(() => {
                if (this.policies.cc) this.options.options.push(this.policies.cc.reroll());
            });
            this.emitOptions();
        } else {
            this.options = this.policies.options || [];
            this.selectedOption = this.options.choiceIndex;
        }
    },
    computed: {
        sorted: function (): (Command[] | Challenge[])[] {
            switch (this.policyType) {
                case "challenges":
                    return this.options.options.map(o => sortChallenges(o))
                case "commands":
                    return this.options.options.map(o => sortCommands(o))
                default:
                    return [];
            }
        }
    },
    methods: {
        clickedChoice: function (choiceIndex: number): void {
            this.selectedOption = this.options.choiceIndex = choiceIndex;
            this.emitOptions();
        },
        emitOptions: function (): void {
            this.$emit('options', this.options);
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
.option-block {
    padding: 10px;
    margin: 10px;
    border: 1px solid $BLUE_BORDER_COLOUR;
    background: $BLUE_BG_NORMAL;
    box-shadow: 0 2px 5px 1px black;

    table {
        tr {
            td {
                img {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    image-rendering: auto;
                }

                .name.game-changing {
                    //background-color: #fc4e4e;
                    //border: 1px solid red;
                    font-weight: bold;
                    color: #ff4141;
                }
            }
        }
    }

    &:hover {
        background: $BLUE_BG_HOVER;
        border: 1px solid $BLUE_BORDER_COLOUR_HOVER;
        cursor: pointer;
    }

    &.selected {
        background: $GREEN_BG_NORMAL;
        border: 1px solid $GREEN_BORDER_COLOUR;

        &:hover {
            background: $GREEN_BG_HOVER;
            border: 1px solid $GREEN_BORDER_COLOUR_HOVER;
        }
    }
}
</style>
