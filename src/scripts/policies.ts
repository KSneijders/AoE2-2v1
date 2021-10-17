import {ChallengeData, CommandData} from "@/interfaces/gamemode-overlay";

function getDefaultPolicyData(): ChallengeData | CommandData {
    return {
        collection: [],
        cc: undefined,
        options: {options: [], choiceIndex: -1},
        quantity: 0
    }
}

export {getDefaultPolicyData}