<template>
    <div>
        <table>
            <tr v-for="policy in policies"
                v-bind:key="policy.id"
                v-bind:title="policy?.desc"
            >
                <td>
                    <img v-bind:src="images['./instant.png']" v-if="policy?.classes?.includes('instant')" alt="">
                    <img v-bind:src="images['./dark.png']" v-if="policy?.classes?.includes('dark')" alt="">
                    <img v-bind:src="images['./feudal.png']" v-if="policy?.classes?.includes('feudal')" alt="">
                    <img v-bind:src="images['./castle.png']" v-if="policy?.classes?.includes('castle')" alt="">
                </td>
                <td>
                    <span v-if="policy?.selectedOption && !policyHasDisplay(policy)">
                        <span v-if="(policyType === 'commands' && policy?.maxRepeat > 1) || policyType === 'challenges'">
                            {{ policy.selectedOption }}
                        </span>
                    </span>
                </td>
                <td>
                    <span class="name" v-bind:class="{
                        'game-changing-challenge': policy?.classes?.includes('game-changing')
                    }">
                        {{ formatPolicy(policy) }}
                    </span>
                    <span v-if="policy?.desc" class="desc-available">
                        *
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {importImages} from "@/scripts/other";
import {Challenge, Command} from "@/interfaces/policies";
import {formatPolicy, policyHasDisplay} from "@/scripts/policies";

const images: Record<string, string> = importImages(
    require.context('/src/assets/images/', false, /\.(jpg|jpe?g|png|gif|webp)$/)
) as Record<string, string>;

export default defineComponent({
    name: "PolicyListView",
    components: {},
    props: {
        policies: {
            type: Array as PropType<Challenge[] | Command[]>,
            default: () => []
        },
        policyType: {
            type: String as PropType<string>,
            default: () => ""
        }
    },
    methods: {
        formatPolicy,
        policyHasDisplay
    },
    data() {
        return {
            images: images
        }
    }
})

</script>

<style scoped lang="scss">
table {
    tr {
        td {
            &:not(:first-child) {
                padding-right: 10px;
            }

            img {
                display: inline-block;
                width: 20px;
                height: 20px;
                image-rendering: auto;
            }

            .desc-available {
                color: #b9a600;
                font-weight: bold;
            }
        }
    }
}
</style>
