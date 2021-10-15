<template>
    <div id="policy-selection">
        <div class="overlay-block-header">Challenges</div>
        <div class="overlay-block-content">
            <div id="challenge-list" class="simple-white-scrollbar">
                <div v-for="challenge in challenges" v-bind:key="challenge.id">
                    {{ challenge.name }}
                    <span v-if="typeof challenge.points === 'object'">
                        {{ challenge.points[challenge.selectedOption] }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {OverlayTab, Side} from "@/enums/gamemode-overlay";
import ChallengeCollection from "@/classes/challenge-collection";
import {GameModeContent} from "@/interfaces/game-mode";
import {Profile, ProfileEntry} from "@/interfaces/profile";
import {sum} from "@/scripts/arrays";
import {Challenge, Command} from "@/interfaces/policies";

export default defineComponent({
    name: "ChallengeSelectionMenu",
    components: {},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => {return {}}
        }
    },
    data() {
        return {
            Side: Side,
            challenges: [] as Challenge[],
            commands: [] as Command[],
        }
    },
    async mounted() {
        const gmc: GameModeContent = this.$store.state.gameModeInfo.content;
        const defendantProfileEntries = this.configData.players.filter(p => p.side === Side.DEFENDANT);
        const defendantProfiles: Profile[] = await window.fs.getProfiles(defendantProfileEntries.map(pe => pe.id));

        if (this.configData?.policies.challenges.length === 0 || this.configData?.policyRefresh) {
            const points = sum(defendantProfiles.map(p => p.points)) / defendantProfiles.length;
            const cc = new ChallengeCollection(
                gmc.challenges,
                gmc.limiters,
                points,
                this.configData.civs.civChoice,
                this.configData.maps,
                true
            );
            this.challenges = cc.getRandomChallenges();
        } else {
            this.challenges = this.configData?.policies.challenges;
        }

        this.$emit('overlay-tab-data-update', OverlayTab.POLICIES, true, {
            challenges: this.challenges,
            commands: this.commands
        })
    },
    computed: {
        userProfile: function (): ProfileEntry {
            return this.configData.players.filter(p => p.id === 'default')[0];
        }
    },
    methods: {
        clicked: function (): void {
            console.log(this.configData.players)
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">

#player-selection {
    height: 100%;
    overflow-y: hidden;

    .overlay-block-content {
    }
}
</style>
