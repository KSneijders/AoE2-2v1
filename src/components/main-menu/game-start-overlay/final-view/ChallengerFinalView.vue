<template>
    <div id="final-screen" class="simple-white-scrollbar">
        <InfoBlockPartial :config-data="configData"/>
        <hr>
        <div id="challenge-overview">
            <h3>Challenges</h3>
            <div id="ages" class="type-block">
                <div v-for="age in ages" v-bind:key="age" class="age-block">
                    <div v-if="challengesPerAge(age).length > 0">
                        <h6>{{ age }}</h6>
                        <div class="challenge-entry" v-for="challenge in challengesPerAge(age)"
                             v-bind:key="challenge.id"
                             @mouseup="challengeClicked($event, challenge, age)"
                             v-bind:class="{
                                 done: getChallengeDone(challenge, age),
                                 important: getChallengeImportant(challenge, age),
                             }"
                        >
                            <img v-bind:src="images[`./${age}.png`]" v-bind:alt="age">
                            {{ formatPolicy(challenge) }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="other" class="type-block">
                <div v-if="challengesWithoutAge.length > 0">
                    <h6>Other challenges</h6>
                    <div class="challenge-entry" v-for="challenge in challengesWithoutAge" v-bind:key="challenge.id"
                         @mouseup="challengeClicked($event, challenge)"
                         v-bind:class="{
                             done: getChallengeDone(challenge),
                             important: getChallengeImportant(challenge),
                             'game-changing-challenge': challenge.classes?.includes('game-changing')
                         }"
                    >
                        {{ formatPolicy(challenge) }}
                    </div>
                </div>
            </div>
        </div>
        <div id="game-end-button-location">
            <GameEndButton @game-end-clicked="$emit('game-end-clicked')"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {Challenge} from "@/interfaces/policies";
import {ensure} from "@/scripts/arrays";
import {importImages} from "@/scripts/other";
import InfoBlockPartial from "@/components/main-menu/game-start-overlay/final-view/InfoBlockPartial.vue";
import GameEndButton from "@/components/main-menu/game-start-overlay/final-view/GameEndButton.vue";
import {formatPolicy} from "@/scripts/policies";

const images: Record<string, string> = importImages(
    require.context('/src/assets/images/', false, /\.(jpg|jpe?g|png|gif|webp)$/)
) as Record<string, string>;

export default defineComponent({
    name: "ChallengerFinalView",
    components: {InfoBlockPartial, GameEndButton},
    props: {
        configData: {
            type: Object as PropType<OverlayConfigData>,
            default: () => new Object()
        }
    },
    data() {
        return {
            images: images,
            ages: ['instant', 'dark', 'feudal', 'castle', 'imp'],
            challengeInfo: {} as Record<string, Record<string, boolean>>,
        }
    },
    mounted() {
        this.configData?.challenges.collection.forEach(c => {
            for (const cls of c.classes || []) {
                const identifier: string = this.getIdentifier(c, this.ages.includes(cls) ? cls : undefined);
                this.challengeInfo[identifier] = {done: false, important: false};
            }
            if ((c.classes || []).length === 0) {
                this.challengeInfo[this.getIdentifier(c)] = {done: false, important: false};
            }
        })
    },
    computed: {
        challengesWithoutAge(): Challenge[] {
            return ensure(this.configData?.challenges?.collection).filter(
                challenge => {
                    if (!challenge?.classes) return true;
                    const ageClasses: string[] = challenge.classes.filter(cls => this.ages.includes(cls));
                    return ageClasses.length === 0;
                }
            )
        },
    },
    methods: {
        formatPolicy,
        challengesPerAge(age: string): Challenge[] {
            return ensure(this.configData?.challenges?.collection).filter(c => c.classes?.includes(age))
        },
        getIdentifier(challenge: Challenge, age?: string): string {
            return age ? challenge.id + age : challenge.id;
        },
        challengeClicked($event: MouseEvent, challenge: Challenge, age?: string): void {
            const identifier: string = this.getIdentifier(challenge, age);
            console.log("\n\n\n")
            console.log($event.button)
            console.log(this.challengeInfo[identifier])
            switch ($event.button) {
                case 0:   // LMB
                    this.challengeInfo[identifier].done = !this.challengeInfo[identifier].done;
                    break;
                case 2:  // RMB
                    this.challengeInfo[identifier].important = !this.challengeInfo[identifier].important;
                    break;
                default:
                    return;
            }
        },
        getChallengeDone(challenge: Challenge, age?: string): boolean {
            const identifier: string = this.getIdentifier(challenge, age);
            return this.challengeInfo[identifier]?.done || false;
        },
        getChallengeImportant(challenge: Challenge, age?: string): boolean {
            const identifier: string = this.getIdentifier(challenge, age);
            return this.challengeInfo[identifier]?.important || false;
        }
    },
    watch: {}
})

</script>

<style scoped lang="scss">
#game-end-button-location {
    position: absolute;
    right: 10px;
    bottom: 10px;
    margin: 5px;
}

#final-screen {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 10px;
    background: $BLUE_BG_NORMAL;
    box-shadow: 0 3px 10px 1px black;

    hr {
        border-top: 1px solid #ccc;
    }

    td {
        padding: 5px 10px;
    }

    #challenge-overview {
        h6 {
            margin-top: 5px;
            font-weight: bold;
            text-transform: uppercase;
            text-shadow: 2px 2px 5px black;
            padding: 2px;
        }

        .type-block {
            display: inline-block;
            margin-right: 50px;
            vertical-align: top;
        }

        .challenge-entry {
            padding: 2px 0;

            &:hover {
                cursor: pointer;
            }

            img {
                display: inline-block;
                height: 20px;
                width: 20px;
            }

            &.important {
                color: #ffc738;
                font-weight: bold;
                text-decoration: underline;
            }

            &.done {
                color: #525252;
                text-decoration: line-through;

                img {
                    filter: grayscale(100%);
                }
            }
        }
    }
}
</style>
