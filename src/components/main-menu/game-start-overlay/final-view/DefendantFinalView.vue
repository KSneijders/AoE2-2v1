<template>
    <div id="final-screen">
        <FinalInfoScreen :config-data="configData"/>
        <hr>
        <div id="command-overview">
            <h3>Commands</h3>
            <div id="command-list">
                <table>
                    <tr v-for="command in configData.commands.collection" v-bind:key="command.id"
                        @mouseup="commandClicked($event, command)"
                        v-bind:class="{emptied: this.commandUsage[command.id] === 0}">
                        <td>
                            {{ command.name }}
                        </td>
                        <td>
                            {{ this.commandUsage[command.id] }} / {{ command?.max_repeat || 1 }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {Command} from "@/interfaces/policies";
import FinalInfoScreen from "@/components/main-menu/game-start-overlay/final-view/FinalInfoScreen.vue";

export default defineComponent({
    name: "DefendantFinalView",
    components: {
        FinalInfoScreen
    },
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    data() {
        return {
            commandUsage: {} as Record<string, number>,
        }
    },
    mounted() {
        this.configData?.commands.collection.forEach(c => {
            this.commandUsage[c.id] = c.max_repeat || 1;
        })
    },
    computed: {},
    methods: {
        commandClicked: function (event: MouseEvent, command: Command): void {
            let change = 0;
            switch (event.button) {
                case 0:   // LMB
                    change = -1;
                    break;
                case 2:  // RMB
                    change = +1;
                    break;
            }

            const usageLeft: number = this.commandUsage[command.id];

            if (usageLeft + change >= 0 && usageLeft + change <= (command.max_repeat || 1)) {
                this.commandUsage[command.id] += change;
            }
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#final-screen {
    height: 100%;
    width: 100%;
    padding: 10px;
    background: $BLUE_BG_NORMAL;
    box-shadow: 0 3px 10px 1px black;

    hr { border-top: 1px solid #ccc; }

    td {
        padding: 5px 10px;
    }

    #command-overview {
        #command-list {
            table {
                tr {
                    td {
                        &:hover {
                            cursor: pointer;
                        }
                    }

                    &.emptied {
                        color: #525252;
                    }
                }
            }
        }
    }
}
</style>
