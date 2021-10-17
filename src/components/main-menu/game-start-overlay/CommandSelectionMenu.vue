<template>
    <div id="command-selection">
        <div class="overlay-block-header">Commands</div>
        <div class="overlay-block-content">
            <PolicySelectRerolls v-if="selectionMode === PolicySelectionMode.REROLLS"
                                 :policies="commandDataSorted"
                                 @reroll="clickedReroll"/>
            <PolicySelectChoice v-if="selectionMode === PolicySelectionMode.CHOICE"
                                :policies="commandDataSorted"
                                :policyType="'commands'"
                                @options="saveOptions"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {CommandData, Options, OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import {ensure, sum} from "@/scripts/arrays";
import {Profile} from "@/interfaces/profile";
import CommandCollection from "@/classes/command-collection";
import {GameModeContent} from "@/interfaces/game-mode";
import PolicySelectRerolls
    from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicySelectRerolls.vue";
import {PolicySelectionMode} from "@/enums/policies";
import PolicySelectChoice from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicySelectChoice.vue";
import {Command} from "@/interfaces/policies";
import {getDefaultPolicyData, sortCommands} from "@/scripts/policies";

export default defineComponent({
    name: "CommandSelectionMenu",
    components: {
        PolicySelectRerolls,
        PolicySelectChoice
    },
    emits: ['overlay-tab-data-update'],
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    data() {
        return {
            PolicySelectionMode: PolicySelectionMode, // For in-template usage

            commands: {} as CommandData,
            selectionMode: PolicySelectionMode.REROLLS,
        }
    },
    async mounted() {
        const gmc: GameModeContent = this.$store.state.gameModeInfo.content;
        const defendantProfileEntries = this.configData?.players.filter(p => p.side === Side.DEFENDANT);
        const defendantProfiles: Profile[] = await window.fs.getProfiles(defendantProfileEntries.map(pe => pe.id));

        const choiceMode: boolean = this.selectionMode === PolicySelectionMode.CHOICE
        const rerollsMode: boolean = this.selectionMode === PolicySelectionMode.REROLLS
        const optionsFound: boolean = this.configData?.commands?.options?.options.length !== 0
        const collectionFound: boolean = this.configData?.commands?.collection.length !== 0

        if ((choiceMode && optionsFound) || (rerollsMode && collectionFound)) {
            this.commands = ensure(this.configData?.commands);
        } else {
            const points = sum(defendantProfiles.map(p => p.points)) / defendantProfiles.length;
            this.commands = getDefaultPolicyData() as CommandData;
            this.commands.cc = new CommandCollection(gmc.commands, points, true);

            this.initialise();
        }
    },
    computed: {
        commandDataSorted: function(): CommandData {
            return {
                collection: sortCommands(this.commands.collection),
                cc: this.commands.cc as CommandCollection,
                options: this.commands.options,
                quantity: this.commands.quantity,
            }
        }
    },
    methods: {
        initialise: function (): void {
            switch (this.selectionMode) {
                case PolicySelectionMode.CHOICE:
                    this.commands.collection = [];
                    this.commands.quantity = 3;
                    break;
                case PolicySelectionMode.REROLLS:
                    this.commands.collection = ensure(this.commands?.cc?.getRandom());
                    this.commands.quantity = 3;
                    break;
            }
            this.updateTabData(this.commands.collection.length > 0);
        },
        clickedReroll: function (): void {
            if (this.commands.cc && this.commands.quantity > 0) {
                this.commands.collection = this.commands.cc.reroll();
                this.commands.quantity--;
                this.updateTabData(true);
            }
        },
        saveOptions: function (options: Options<Command[]>): void {
            this.commands.options = options;
            if (options.choiceIndex !== -1) {
                this.commands.collection = options.options[options.choiceIndex]
            }
            this.updateTabData(options.choiceIndex !== -1);
        },
        updateTabData: function (valid = true): void {
            this.$emit('overlay-tab-data-update', OverlayTab.COMMANDS, valid, this.commandDataSorted)
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">

#command-selection {
    height: 100%;
    width: 100%;
    overflow-y: hidden;

    .overlay-block-content {
        width: 100%;
    }
}
</style>
