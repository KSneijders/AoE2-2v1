<template>
    <div id="policy-selection">
        <div id="reroll-button" @click="clickedReroll" v-bind:class="{'out-of-rolls': policies.quantity === 0}">
            Reroll Policies ({{ policies.quantity }})
        </div>
        <div id="policy-list" class="simple-white-scrollbar">
            <PolicyListView :policies="policies.collection"
                            :policyType="policyType"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData} from "@/interfaces/gamemode-overlay";
import PolicyListView from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicyListView.vue";

export default defineComponent({
    name: "PolicySelectRerolls",
    components: {
        PolicyListView
    },
    emits: ['reroll'],
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
    // data() {
    //     // Data
    // },
    mounted() {
        // Execute on creation
    },
    computed: {},
    methods: {
        clickedReroll (): void {
            if (this.policies.quantity > 0) {
                this.$emit('reroll');
            }
        },
    },
    watch: {}
})

</script>

<style scoped lang="scss">

#policy-selection {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    position: relative;
    margin: 10px;
    padding: 10px;
    background: $BLUE_BG_NORMAL;
    border: 1px solid $BLUE_BORDER_COLOUR;
    box-shadow: 0 3px 10px 1px black;

    #policy-list {
        overflow-y: auto;
        position: absolute;
    }

    #reroll-button {
        position: absolute;
        right: 10px;
        margin: 5px;
        padding: 5px;
        background: $GREEN_BG_NORMAL;
        box-shadow: 0 2px 5px 1px #2f562d;

        user-select: none;

        &:hover {
            background: $GREEN_BG_HOVER;
            box-shadow: 0 2px 5px 1px #588653;
            cursor: pointer;
        }

        &.out-of-rolls {
            background: $RED_BG_NORMAL;
            border: 1px solid $RED_BORDER_COLOUR;
            box-shadow: 0 2px 5px 1px #a41a1a;

            &:hover {
                background: $RED_BG_HOVER;
                border: 1px solid $RED_BORDER_COLOUR_HOVER;
                box-shadow: 0 2px 5px 1px #e04e4e;
                cursor: not-allowed;
            }
        }
    }
}
</style>
