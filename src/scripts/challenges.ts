import {Challenges} from "@/interfaces/policies";
import {strReplaceKeyValue} from "@/scripts/strings";
import {CivModifier, MapModifier} from "@/interfaces/modifiers";
import {Civ} from "@/enums/civs";

const challengeUrl = "https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/game-modes/__GAME_MODE__/__FILE__.json";
const modifierUrl = "https://raw.githubusercontent.com/KSneijders/AoE2-2v1/dynamics/game-modes/__GAME_MODE__/challenge-modifiers/__MODIFIER__.json";

interface Modifiers {
    civs: CivModifier[];
    maps: MapModifier[];
}

async function loadModifiers(gameMode: string): Promise<Modifiers> {
    const civUrl = strReplaceKeyValue(modifierUrl, {'__GAME_MODE__': gameMode, '__MODIFIER__': 'civs'})
    const mapUrl = strReplaceKeyValue(modifierUrl, {'__GAME_MODE__': gameMode, '__MODIFIER__': 'maps'})

    return {
        'civs': await window.axios.get(civUrl) as CivModifier[],
        'maps': await window.axios.get(mapUrl) as MapModifier[]
    }
}

async function loadGameMode(gameMode: string): Promise<void> {
    const cUrl = strReplaceKeyValue(challengeUrl, {'__GAME_MODE__': gameMode, '__FILE__': 'challenges'})
    const mUrl = strReplaceKeyValue(challengeUrl, {'__GAME_MODE__': gameMode, '__FILE__': 'maps'})
    const challenges = await window.axios.get(cUrl) as Challenges
    const maps = await window.axios.get(mUrl) as string[]

    const modifiers = await loadModifiers(gameMode);

    // ----------------------------------- CIVS Modifier -----------------------------------
    const remappedCivModifiers: Record<string, CivModifier> = {};
    for (const entry of modifiers.civs) {
        if (!entry["civs-have-challenges"]) {  // Invert civ list
            entry.civs = Object.values(Civ).filter(c => !entry.civs.includes(c))
        }

        for (const challenge of entry.challenges) {
            remappedCivModifiers[challenge] = entry;
        }
    }

    for (const category of Object.keys(challenges)) {
        for (const challenge of challenges[category]) {
            if (challenge.id in remappedCivModifiers) {
                challenge.civs = remappedCivModifiers[challenge.id].civs
            }
        }
    }

    // ----------------------------------- MAPS Modifier -----------------------------------
    const remappedMapModifiers: Record<string, MapModifier> = {};
    for (const entry of modifiers.maps) {
        if (!entry["maps-allow-challenges"]) {  // Invert civ list
            entry.maps = maps.filter(c => !entry.maps.includes(c))
        }

        for (const challenge of entry.challenges) {
            remappedMapModifiers[challenge] = entry;
        }
    }

    for (const category of Object.keys(challenges)) {
        for (const challenge of challenges[category]) {
            if (challenge.id in remappedMapModifiers) {
                challenge.maps = remappedMapModifiers[challenge.id].maps
            }
        }
    }
}

export {loadGameMode}
