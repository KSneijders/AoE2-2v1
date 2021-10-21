import {ChallengeData, CommandData} from "@/interfaces/gamemode-overlay";
import {Challenge, Command} from "@/interfaces/policies";
import {jsonDeepCopy} from "@/scripts/other";
import {classValues} from "@/data/policies";
import {strFormat} from "@/scripts/strings";
import {ensure} from "@/scripts/arrays";

function getDefaultPolicyData(): ChallengeData | CommandData {
    return {
        collection: [],
        cc: undefined,
        options: {options: [], choiceIndex: -1},
        quantity: 0
    }
}

function sortChallenges(challenges: Challenge[]): Challenge[] {
    if (!challenges || challenges.length === 0) return [];

    const ageClasses = Object.keys(classValues);
    return jsonDeepCopy(challenges).sort(
        (a, b) => {
            const aCls: string | undefined = a?.classes?.find(c => ageClasses.includes(c));
            const bCls: string | undefined = b?.classes?.find(c => ageClasses.includes(c));

            if (!aCls && !bCls) return a.name.localeCompare(b.name);
            if (aCls && bCls) {
                const order: number = (classValues[aCls] > classValues[bCls] ? 1 : 0) - (classValues[aCls] < classValues[bCls] ? 1 : 0);
                if (order === 0) return a.name.localeCompare(b.name);
                return order;
            }
            if (aCls) return -1;
            if (bCls) return 1;
            return 0;
        }
    );
}

function sortCommands(commands: Command[]): Command[] {
    if (!commands || commands.length === 0) return [];

    return jsonDeepCopy(commands).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * If a policy has a valid display value and selected option
 *
 * @param policy The policy that can('t) be formatted
 */
function policyHasDisplay(policy: Command | Challenge): boolean {
    return !!policy.selectedOption && !!policy.display;
}

/**
 * Format a policy based on it's display value and selected option
 *
 * @param policy The policy to format
 */
function formatPolicy(policy: Command | Challenge): string {
    if (!policyHasDisplay(policy)) return policy.name;
    return strFormat(
        ensure(policy.display),
        ensure(policy.selectedOption)
    )
}

export {getDefaultPolicyData, sortChallenges, sortCommands, formatPolicy, policyHasDisplay}