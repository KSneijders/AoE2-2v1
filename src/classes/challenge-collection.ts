import {Challenge, Challenges, PointObject, Points} from "@/interfaces/policies";
import {randomPoints} from "@/scripts/points";
import {sample, shuffle} from "@/scripts/arrays";
import {jsonDeepCopy} from "@/scripts/other";

interface IdMap {
    [key: string]: (string | number)[];
}

class ChallengeCollection {
    private readonly maxIterations = 1000;

    challenges: Challenges;
    private points: Points;
    private shuffled: boolean;
    private readonly challengeIdMap: IdMap;

    constructor(challenges: Challenges, shuffle = false) {
        this.challenges = jsonDeepCopy(challenges);
        this.challengeIdMap = {};
        this.points = randomPoints(25, 0);
        this.shuffled = shuffle;

        this.initiateIdMap();
        if (shuffle) this.shuffleChallenges();
    }

    initiateIdMap(): void {
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
    }

    getRandomChallenges(): Challenge[] {
        if (!this.shuffled) throw Error("Cannot get random challenges without shuffling challenges.");

        let keys = Object.keys(this.points).filter(k => k != "wildPoints");
        const pIndex = {economy: 0, building: 0, military: 0, miscellaneous: 0, technologies: 0} as Points
        const challenges = [] as Challenge[]

        for (let i = 0; i <= this.maxIterations; i++) {
            const key = sample(keys);
            if (key === undefined) break;

            const challenge = this.chooseFirstAllowedChallenge(key, pIndex);
            if (challenge === undefined) {
                keys = keys.filter(k => k != key);
                continue;
            }

            challenges.push(challenge)

            if (i === this.maxIterations) throw Error(`Maximum ChallengeCollection iterations reached (${i}).`);
        }

        return challenges;
    }

    private chooseFirstAllowedChallenge(key: string, pIndex: Points): Challenge | undefined {
        const spendable = this.getSpendable(key);

        for (let i = pIndex[key]; i < this.challenges[key].length; i++) {
            const challenge = this.challenges[key][pIndex[key]];
            pIndex[key]++;

            let cost: number;
            if (typeof challenge.points === "object") {
                cost = challenge.points[this.selectRandomOption(key, challenge)]
            } else {
                cost = challenge.points
            }

            if (cost <= spendable) {
                const wildPointCost = Math.min(Math.floor(cost / 2), this.points['wildPoints']);

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