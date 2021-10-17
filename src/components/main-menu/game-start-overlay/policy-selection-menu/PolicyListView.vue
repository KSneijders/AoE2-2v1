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
                    <span class="name" v-bind:class="{'game-changing': policy?.classes?.includes('game-changing')}">
                        {{ policy.name }}
                    </span>
                    <span v-if="policy?.selectedOption">
                        &nbsp;({{ policy.selectedOption }})
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
        }
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
            img {
                display: inline-block;
                width: 20px;
                height: 20px;
                image-rendering: auto;
            }

            .name.game-changing {
                font-weight: bold;
                color: #ff4141;
            }

            .desc-available {
                color: #b9a600;
                font-weight: bold;
            }
        }
    }
}
</style>
