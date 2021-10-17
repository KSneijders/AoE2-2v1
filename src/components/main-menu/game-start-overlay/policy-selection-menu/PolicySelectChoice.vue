<template>
    <div class="simple-white-scrollbar">
        <div class="option-block"
             v-for="(option, index) in options.options"
             v-bind:key="index"
             v-bind:class="{selected: index === selectedOption}"
             @click="clickedChoice(index)"
        >
            <div id="policy-list" class="simple-white-scrollbar">
                <div v-for="policy in option" v-bind:key="policy.id">
                    {{ policy.name }}
                    <span v-if="typeof policy.points === 'object'">
                        ({{ policy.selectedOption }})
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData, Options} from "@/interfaces/gamemode-overlay";
import {Challenge, Command} from "@/interfaces/policies";
import {range} from "@/scripts/arrays";
import {sleep} from "@/scripts/other";

export default defineComponent({
    name: "PolicySelectChoice",
    components: {},
    props: {
        policies: {
            type: Object as PropType<CommandData | ChallengeData>,
            default: () => new Object()
        }
    },
    data() {
        return {
            options: {} as Options<Command[] | Challenge[]>,
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
    computed: {},
    methods: {
        clickedChoice: function (choiceIndex: number): void {
            this.selectedOption = this.options.choiceIndex = choiceIndex;
            this.emitOptions();
        },
        emitOptions: function(): void {
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
    border: 1px solid $BORDER_COLOUR;
    background: $BLUE_BG_NORMAL;

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
</style>
