<template>
    <div id="challenge-selection">
        <div class="overlay-block-header">Challenges</div>
        <div class="overlay-block-content">
            <PolicySelectRerolls  v-if="selectionMode === PolicySelectionMode.REROLLS"
                                  :policies="this.challenges" @reroll="clickedReroll"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ChallengeData, OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import ChallengeCollection from "@/classes/challenge-collection";
import {GameModeContent} from "@/interfaces/game-mode";
import {Profile, ProfileEntry} from "@/interfaces/profile";
import {sum} from "@/scripts/arrays";
import PolicySelectRerolls
    from "@/components/main-menu/game-start-overlay/policy-selection-menu/PolicySelectRerolls.vue";
import {PolicySelectionMode} from "@/enums/policies";

export default defineComponent({
    name: "ChallengeSelectionMenu",
    components: {
        PolicySelectRerolls
    },
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
        const defendantProfileEntries = this.configData?.players.filter(p => p.side === Side.DEFENDANT);
        const defendantProfiles: Profile[] = await window.fs.getProfiles(defendantProfileEntries.map(pe => pe.id));

        if (this.configData?.challenges?.collection.length === 0) {
            const points = sum(defendantProfiles.map(p => p.points)) / defendantProfiles.length;
            this.challenges.cc = new ChallengeCollection(
                gmc.challenges,
                gmc.limiters,
                points,
                this.configData?.civs.options[this.configData.civs.choiceIndex],
                this.configData.maps,
                true
            );
            this.challenges.collection = this.challenges.cc.getRandom();
            this.challenges.quantity = 3;
        } else {
            this.challenges = this.configData?.challenges || {collection: [], quantity: 0};
        }

        this.updateTabData(true);
    },
    computed: {
        userProfile: function (): ProfileEntry {
            return this.configData.players.filter(p => p.id === 'default')[0];
        }
    },
    methods: {
        clickedReroll: function (): void {
            if (this.challenges.cc && this.challenges.quantity > 0) {
                this.challenges.collection = this.challenges.cc.reroll();
                this.challenges.quantity--;
                this.updateTabData(true);
            }
        },
        updateTabData: function (valid = true): void {
            this.$emit('overlay-tab-data-update', OverlayTab.CHALLENGES, valid, this.challenges)
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
