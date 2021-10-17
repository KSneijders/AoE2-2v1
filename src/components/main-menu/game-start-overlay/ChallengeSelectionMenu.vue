<template>
    <div id="challenge-selection">
        <div class="overlay-block-header">Challenges</div>
        <div class="overlay-block-content">
            <PolicySelectRerolls v-if="selectionMode === PolicySelectionMode.REROLLS"
                                 :policies="challengeDataSorted" @reroll="clickedReroll"/>
            <PolicySelectChoice v-if="selectionMode === PolicySelectionMode.CHOICE"
                                :policies="challengeDataSorted"
                                :policyType="'challenges'"
                                @options="saveOptions"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, Options, OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import ChallengeCollection from "@/classes/challenge-collection";
import {GameModeContent} from "@/interfaces/game-mode";
import {Profile, ProfileEntry} from "@/interfaces/profile";
import {ensure, sum} from "@/scripts/arrays";
import PolicySelectRerolls
    from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicySelectRerolls.vue";
import {PolicySelectionMode} from "@/enums/policies";
import PolicySelectChoice from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicySelectChoice.vue";
import {Challenge} from "@/interfaces/policies";
import {getDefaultPolicyData, sortChallenges} from "@/scripts/policies";
import {calculatePoints} from "@/scripts/points";

export default defineComponent({
    name: "ChallengeSelectionMenu",
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

            challenges: {} as ChallengeData,
            selectionMode: PolicySelectionMode.REROLLS
        }
    },
    async mounted() {
        const gmc: GameModeContent = this.$store.state.gameModeInfo.content;

        const choiceMode: boolean = this.selectionMode === PolicySelectionMode.CHOICE
        const rerollsMode: boolean = this.selectionMode === PolicySelectionMode.REROLLS
        const optionsFound: boolean = this.configData?.challenges?.options?.options.length !== 0
        const collectionFound: boolean = this.configData?.challenges?.collection.length !== 0

        if ((choiceMode && optionsFound) || (rerollsMode && collectionFound)) {
            this.challenges = ensure(this.configData?.challenges);
        } else {
            const civ: string = this.configData?.civs.options[this.configData.civs.choiceIndex];

            this.challenges = getDefaultPolicyData() as ChallengeData;
            this.challenges.cc = new ChallengeCollection(
                gmc.challenges, gmc.limiters, this.configData?.points, civ, this.configData.maps, true
            );
            this.initialise();
        }
    },
    computed: {
        userProfile: function (): ProfileEntry {
            return this.configData.players.filter(p => p.id === 'default')[0];
        },
        challengeDataSorted: function (): ChallengeData {
            return {
                collection: sortChallenges(this.challenges.collection),
                cc: this.challenges.cc as ChallengeCollection,
                options: this.challenges.options,
                quantity: this.challenges.quantity,
            };
        }
    },
    methods: {
        initialise: function (): void {
            switch (this.selectionMode) {
                case PolicySelectionMode.CHOICE:
                    this.challenges.collection = [];
                    this.challenges.quantity = 3;
                    break;
                case PolicySelectionMode.REROLLS:
                    this.challenges.collection = ensure(this.challenges?.cc?.getRandom());
                    this.challenges.quantity = 3;
                    break;
            }
            this.updateTabData(this.challenges.collection.length > 0);
        },
        clickedReroll: function (): void {
            if (this.challenges.cc && this.challenges.quantity > 0) {
                this.challenges.collection = this.challenges.cc.reroll();
                this.challenges.quantity--;
                this.updateTabData(true);
            }
        },
        saveOptions: function (options: Options<Challenge[]>): void {
            this.challenges.options = options;
            if (options.choiceIndex !== -1) {
                this.challenges.collection = options.options[options.choiceIndex]
            }
            this.updateTabData(options.choiceIndex !== -1);
        },
        updateTabData: function (valid = true): void {
            this.$emit('overlay-tab-data-update', OverlayTab.CHALLENGES, valid, this.challengeDataSorted)
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">

#challenge-selection {
    height: 100%;
    width: 100%;
    overflow-y: hidden;

    .overlay-block-content {
        width: 100%;

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

        #challenge-list {
            overflow-y: auto;
            padding: 10px;
            width: 100%;
        }
    }
}
</style>
