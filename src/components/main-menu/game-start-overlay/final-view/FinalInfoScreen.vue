<template>
    <div id="info-overview">
        <h3>Configurations</h3>
        <table class="info-table">
            <tr>
                <td>Civ:</td>
                <td>{{ configData.civs.options[configData.civs.choiceIndex] }}</td>
            </tr>
            <tr>
                <td>Map:</td>
                <td>{{ configData.maps }}</td>
            </tr>
            <tr>
                <td>Points:</td>
                <td>{{ configData.points }}</td>
            </tr>
        </table>
        <table class="info-table">
            <tr>
                <td>Defendants:</td>
                <td>{{ defendantNames }}</td>
            </tr>
            <tr>
                <td>Challengers:</td>
                <td>{{ challengerNames }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {formatSummary} from "@/scripts/strings";
import {Side} from "@/enums/gamemode-overlay";
import {ensure} from "@/scripts/arrays";

export default defineComponent({
    name: "FinalInfoScreen",
    components: {},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    computed: {
        challengerNames(): string {
            return formatSummary(this.getSideNames(Side.CHALLENGER));
        },
        defendantNames(): string {
            return formatSummary(this.getSideNames(Side.DEFENDANT));
        }
    },
    methods: {
        getSideNames(side: Side) {
            return ensure(this.configData?.players).filter(p => p.side === side).map(p => p.name);
        },
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#info-overview {
    .info-table {
        display: inline-block;
        vertical-align: top;
        margin-right: 50px;
    }

    td:first-child {
        font-weight: bold;
    }

    td {
        text-transform: capitalize;
        padding: 2px 10px;
    }
}
</style>
