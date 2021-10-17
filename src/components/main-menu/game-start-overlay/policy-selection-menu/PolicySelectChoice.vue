<template>
    <div class="simple-white-scrollbar">
        <div class="option-block"
             v-for="(option, index) in sorted"
             v-bind:key="index"
             v-bind:class="{selected: index === selectedOption}"
             @click="clickedChoice(index)"
        >
            <div id="policy-list" class="simple-white-scrollbar">
                <PolicyListView :policies="option"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData, Options} from "@/interfaces/gamemode-overlay";
import {Challenge, Command} from "@/interfaces/policies";
import {ensure, range} from "@/scripts/arrays";
import {sleep} from "@/scripts/other";
import {sortChallenges, sortCommands} from "@/scripts/policies";
import PolicyListView from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicyListView.vue";

export default defineComponent({
    name: "PolicySelectChoice",
    components: {
        PolicyListView
    },
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
            options: {options: [], choiceIndex: -1} as Options<Command[] | Challenge[]>,
            selectedOption: -1 as number,
        }
    },
    async mounted() {
        while (!this.policies?.cc) await sleep(20);

        if (this.policies.options.options.length === 0) {
            range(this.policies.quantity).forEach(() => {
                if (this.policies.cc) this.options.options.push(this.policies.cc.reroll());
            });
            this.emitOptions();
        } else {
            this.options = ensure(this.policies.options);
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
