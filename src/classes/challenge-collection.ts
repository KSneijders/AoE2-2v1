import {CategoryPoints, Challenge, Challenges, PointObject, Points} from "@/interfaces/policies";
import {randomPoints} from "@/scripts/points";
import {sample, shuffle} from "@/scripts/arrays";
import {jsonDeepCopy} from "@/scripts/other";
import {Limiters} from "@/interfaces/limiters";
import {PolicyCategories} from "@/enums/policies";

interface ChallengeIdMap {
    [key: string]: (string | number)[];
}

interface IgnoreIndexes {
    [key: string]: number[];
}

class ChallengeCollection {
    private readonly maxIterations = 1000;

    private readonly initialChallenges: Challenges;
    private readonly initialPoints: number;
    private readonly map: string;
    private readonly civ: string;

    readonly limiters: Limiters;

    private filteredOutChallenges: string[];
    private challengeIdMap: ChallengeIdMap;
    private shuffled: boolean;

    challenges: Challenges;
    points: Points;

    constructor(challenges: Challenges, limiters: Limiters, points: number, civ = "", map = "", shuffle = false) {
        this.initialChallenges = jsonDeepCopy(challenges);
        this.initialPoints = points;

        this.challenges = jsonDeepCopy(this.initialChallenges);
        this.limiters = limiters;
        this.points = randomPoints(this.initialPoints, .5);
        this.map = map;
        this.civ = civ;

        this.filteredOutChallenges = [];
        this.challengeIdMap = {};
        this.shuffled = shuffle;

        this.filterChallenges();
        if (shuffle) this.shuffleChallenges();
    }

    reInitialise(): void {
        this.points = randomPoints(this.initialPoints, .5);
        this.challenges = jsonDeepCopy(this.initialChallenges);

        this.filterChallenges();
    }

    reroll(): Challenge[] {
        if (!this.shuffled) throw new Error("Cannot reroll if challenges weren't shuffled before")

        this.reInitialise();
        this.shuffleChallenges();
        return this.getRandomChallenges();
    }

    private filterFunc(challenge: Challenge): boolean {
        if (challenge.maps && !challenge.maps.includes(this.map) || challenge.civs && !challenge.civs.includes(this.civ)) {
            this.filteredOutChallenges.push(challenge.id);
            return false;
        }
        return true;
    }

    private filterChallenges(): void {
        this.filteredOutChallenges = [];
        for (const category of Object.keys(this.challenges)) {
            this.challenges[category] = this.challenges[category].filter(challenge => this.filterFunc(challenge))
        }
    }

    resetChallengeIdMap(): void {
        this.challengeIdMap = {};
        for (const category of Object.keys(this.challenges)) {
            for (const [index, challenge] of this.challenges[category].entries()) {
                this.challengeIdMap[challenge.id] = [category, index]
            }
        }
    }

    shuffleChallenges(): void {
        for (const key of Object.keys(this.challenges)) {
            shuffle(this.challenges[key])
        }
        this.shuffled = true;
        this.resetChallengeIdMap();
    }

    getRandomChallenges(): Challenge[] {
        if (!this.shuffled) throw Error("Cannot get random challenges without shuffling challenges.");

        let keys = Object.values(PolicyCategories);
        const ignoreIndexes: IgnoreIndexes = {}
        const challenges: Challenge[] = []

        const indexProgress: CategoryPoints = {
            economy: 0, building: 0, military: 0, miscellaneous: 0, technologies: 0,
        }
        for (const category of Object.keys(this.challenges)) {
            ignoreIndexes[category] = []
        }

        for (let i = 0; i <= this.maxIterations; i++) {
            const key = sample(keys);
            if (key === undefined) break;

            const challenge = this.chooseFirstAllowedChallenge(key, ignoreIndexes, indexProgress);
            if (challenge === undefined) {
                keys = keys.filter(k => k != key);
                continue;
            }

            challenges.push(challenge)

            if (i === this.maxIterations) throw Error(`Maximum ChallengeCollection iterations reached (${i}).`);
        }

        return challenges;
    }

    private chooseFirstAllowedChallenge(key: string, ignoreIndexes: IgnoreIndexes, indexProgress: CategoryPoints): Challenge | undefined {
        const spendable = this.getSpendable(key);

        for (let i = indexProgress[key] + 1; i < this.challenges[key].length; i++) {
            if (ignoreIndexes[key].includes(i)) continue
            indexProgress[key] = i;

            const challenge = this.challenges[key][indexProgress[key]];
            let cost: number;
            if (typeof challenge.points === "object") {
                const selectedOption = this.selectRandomOption(key, challenge)
                if (selectedOption === undefined) continue
                cost = challenge.points[selectedOption]
            } else {
                cost = challenge.points
            }

            if (cost <= spendable) {
                const wildPointCost = Math.min(Math.floor(cost / 2), this.points['wildPoints']);

                for (const limiterElement of this.limiters[challenge.id] || []) {
                    if (this.filteredOutChallenges.includes(limiterElement)) continue;

                    const mapped = this.challengeIdMap[limiterElement];
                    if (mapped === undefined) throw Error(`Limiter ${limiterElement} does not exist in challenges`);

                    const [category, index] = mapped
                    if (typeof index === "number") ignoreIndexes[category].push(index)
                }

                this.points['wildPoints'] -= wildPointCost;
                this.points[key] -= (cost - wildPointCost);
                return challenge;
            }
        }

        return undefined;
    }

    private getSpendable(key: string): number {
        return this.points[key] + this.points['wildPoints'];
    }

    private selectRandomOption(key: string, challenge: Challenge): string {
        let options = Object.keys(challenge.points as PointObject)
        options = options.filter(k => (challenge.points as PointObject)[k] <= this.getSpendable(key))
        return challenge.selectedOption = sample(options);
    }
}

export default ChallengeCollection