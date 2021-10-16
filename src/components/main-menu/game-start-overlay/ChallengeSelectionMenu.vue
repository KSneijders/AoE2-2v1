<template>
    <div id="challenge-selection">
        <div class="overlay-block-header">Challenges</div>
        <div class="overlay-block-content">
            <div id="reroll-button" @click="clickedReroll" v-bind:class="{'out-of-rolls': this.challenges.rerolls===0}">
                Reroll Challenges ({{ challenges.rerolls }})
            </div>
            <div id="challenge-list" class="simple-white-scrollbar">
                <div v-for="challenge in challenges.collection" v-bind:key="challenge.id">
                    {{ challenge.name }}
                    <span v-if="typeof challenge.points === 'object'">
                        ({{ challenge.selectedOption }})
                    </span>
                </div>
            </div>
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

export default defineComponent({
    name: "ChallengeSelectionMenu",
    components: {},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            Side: Side,
            cc: {} as ChallengeCollection,
            challenges: {} as ChallengeData,
        }
    },
    async mounted() {
        const gmc: GameModeContent = this.$store.state.gameModeInfo.content;
        const defendantProfileEntries = this.configData?.players.filter(p => p.side === Side.DEFENDANT);
        const defendantProfiles: Profile[] = await window.fs.getProfiles(defendantProfileEntries.map(pe => pe.id));

        if (this.configData?.challenges?.collection.length === 0) {
            const points = sum(defendantProfiles.map(p => p.points)) / defendantProfiles.length;
            this.cc = new ChallengeCollection(
                gmc.challenges,
                gmc.limiters,
                points,
                this.configData.civs.civChoice,
                this.configData.maps,
                true
            );
            this.challenges.collection = this.cc.getRandomChallenges();
            this.challenges.rerolls = 3;
        } else {
            this.challenges = this.configData?.challenges || {collection: [], rerolls: 0};
        }

        this.$emit('overlay-tab-data-update', OverlayTab.CHALLENGES, true, this.challenges)
    },
    computed: {
        userProfile: function (): ProfileEntry {
            return this.configData.players.filter(p => p.id === 'default')[0];
        }
    },
    methods: {
        clickedReroll: function (): void {
            if (this.cc && this.challenges.rerolls > 0) {
                this.challenges.collection = this.cc.reroll();
                this.challenges.rerolls--;
                this.$emit('overlay-tab-data-update', OverlayTab.CHALLENGES, true, this.challenges)
            }
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
