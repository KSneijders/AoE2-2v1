<template>
    <div id="final-screen">
        <FinalInfoScreen :config-data="configData"/>
        <hr>
        <div id="challenge-overview">
            <h3>Challenges</h3>
            <div id="ages" class="type-block">
                <div v-for="age in ages" v-bind:key="age" class="age-block">
                    <div v-if="challengesPerAge(age).length > 0">
                        <h6>{{ age }}</h6>
                        <div class="challenge-entry" v-for="challenge in challengesPerAge(age)"
                             v-bind:key="challenge.id"
                             @click="challengeClicked(challenge, age)"
                             v-bind:class="{done: getChallengeDone(challenge, age)}"
                        >
                            <img v-bind:src="images[`./${age}.png`]" v-bind:alt="age">
                            {{ challenge.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="other" class="type-block">
                <div v-if="challengesWithoutAge.length > 0">
                    <h6>Other challenges</h6>
                    <div class="challenge-entry" v-for="challenge in challengesWithoutAge" v-bind:key="challenge.id"
                         @click="challengeClicked(challenge)"
                         v-bind:class="{done: getChallengeDone(challenge)}"
                    >
                        {{ challenge.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {OverlayConfigData} from "@/interfaces/gamemode-overlay";
import {Challenge} from "@/interfaces/policies";
import {ensure} from "@/scripts/arrays";
import {importImages} from "@/scripts/other";
import FinalInfoScreen from "@/components/main-menu/game-start-overlay/final-view/FinalInfoScreen.vue";

const images: Record<string, string> = importImages(
    require.context('/src/assets/images/', false, /\.(jpg|jpe?g|png|gif|webp)$/)
) as Record<string, string>;

export default defineComponent({
    name: "ChallengerFinalView",
    components: {FinalInfoScreen},
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
            challengeDone: {} as Record<string, boolean>,
        }
    },
    mounted() {
        this.configData?.challenges.collection.forEach(c => {
            for (const cls of c.classes || []) {
                const identifier: string = this.getIdentifier(c, this.ages.includes(cls) ? cls : undefined);
                this.challengeDone[identifier] = false;
            }
            if ((c.classes || []).length === 0) {
                this.challengeDone[this.getIdentifier(c)] = false;
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
        challengesPerAge(age: string): Challenge[] {
            return ensure(this.configData?.challenges?.collection).filter(c => c.classes?.includes(age))
        },
        getIdentifier(challenge: Challenge, age?: string): string {
            return age ? challenge.id + age : challenge.id;
        },
        challengeClicked(challenge: Challenge, age?: string): void {
            const identifier: string = this.getIdentifier(challenge, age);
            console.log(identifier)
            this.challengeDone[identifier] = !this.challengeDone[identifier];
        },
        getChallengeDone(challenge: Challenge, age?: string): boolean {
            const identifier: string = this.getIdentifier(challenge, age);
            return this.challengeDone[identifier];
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
