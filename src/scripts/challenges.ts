import {CivModifier, MapModifier} from "@/interfaces/modifiers";
import {Civ} from "@/enums/civs";

interface Modifiers {
    civs: CivModifier[];
    maps: MapModifier[];
}

async function loadModifiers(gameMode: string): Promise<Modifiers> {
    return {
        'civs': await window.axios.getCivModifier(gameMode),
        'maps': await window.axios.getMapModifier(gameMode)
    }
}

async function loadGameMode(gameMode: string): Promise<void> {
    const challenges = await window.axios.getChallenges(gameMode);
    const maps = await window.axios.getMaps(gameMode);

    const modifiers = await loadModifiers(gameMode);

    // ----------------------------------- CIVS Modifier -----------------------------------
    const remappedCivModifiers: Record<string, CivModifier> = {};
    for (const entry of modifiers.civs) {
        if (!entry["civs-have-access-to-challenges"]) {  // Invert civ list
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
