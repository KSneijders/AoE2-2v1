<template>
    <div id="policy-selection">
        <div id="reroll-button" @click="clickedReroll" v-bind:class="{'out-of-rolls': policies.quantity === 0}">
            Reroll Policies ({{ policies.quantity }})
        </div>
        <div id="policy-list" class="simple-white-scrollbar">
            <div v-for="policy in policies.collection" v-bind:key="policy.id">
                {{ policy.name }}
                <span v-if="typeof policy.points === 'object'">
                ({{ policy.selectedOption }})
            </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData} from "@/interfaces/gamemode-overlay";

export default defineComponent({
    name: "PolicySelectRerolls",
    components: {},
    emits: ['reroll'],
    props: {
        policies: {
            type: Object as PropType<CommandData | ChallengeData>,
            default: () => new Object()
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
        clickedReroll: function (): void {
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
        right: 0;
        margin: 5px;
        padding: 5px;
        background: $GREEN_BG_NORMAL;
        border: 1px solid $GREEN_BORDER_COLOUR;

        user-select: none;

        &:hover {
            background: $GREEN_BG_HOVER;
            border: 1px solid $GREEN_BORDER_COLOUR_HOVER;
            cursor: pointer;
        }

        &.out-of-rolls {
            background: $RED_BG_NORMAL;
            border: 1px solid $RED_BORDER_COLOUR;

            &:hover {
                background: $RED_BG_HOVER;
                border: 1px solid $RED_BORDER_COLOUR_HOVER;
                cursor: not-allowed;
            }
        }
    }
}
</style>
