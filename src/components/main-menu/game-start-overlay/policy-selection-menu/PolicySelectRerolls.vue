<template>
    <div id="reroll-button" @click="clickedReroll" v-bind:class="{'out-of-rolls': policies.quantity === 0}">
        Reroll Commands ({{ policies.quantity }})
    </div>
    <div id="policy-list" class="simple-white-scrollbar">
        <div v-for="policy in policies.collection" v-bind:key="policy.id">
            {{ policy.name }}
            <span v-if="typeof policy.points === 'object'">
                ({{ policy.selectedOption }})
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, CommandData} from "@/interfaces/gamemode-overlay";

export default defineComponent({
    name: "PolicySelectRerolls",
    components: {},
    props: {
        policies: {
            type: Object as PropType<CommandData | ChallengeData>,
            default: () => new Object()
        }
    },
    data() {
        // Data
    },
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


#reroll-button {
    margin: 5px;
    float: right;
    padding: 5px;
    background: $GREEN_BG_NORMAL;
    border: 1px solid #7696b6;

    user-select: none;

    &:hover {
        background: $GREEN_BG_HOVER;
        border: 1px solid #96b3d0;
        cursor: pointer;
    }

    &.out-of-rolls {
        background: $RED_BG_NORMAL;

        &:hover {
            background: $RED_BG_HOVER;
        }
    }
}


#policy-list {
    overflow-y: auto;
    padding: 10px;
    width: 100%;
}
</style>
