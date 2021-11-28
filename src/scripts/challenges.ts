import {CivModifier, MapModifier} from "@/interfaces/modifiers";
import {Civ} from "@/enums/civs";
import {Limiters} from "@/interfaces/limiters";
import {getDefault} from "@/scripts/objects";
import {GameModeContent} from "@/interfaces/game-mode";

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

/**
 * Loads a gamemode based on it's name. Returns the settings for:
 * - Challenges
 * - Commands
 * - Limiters
 * - Maps
 *
 * @param gameMode The gamemode to load
 */
async function loadGameMode(gameMode: string): Promise<GameModeContent> {
    const challenges = await window.axios.getChallenges(gameMode);
    const commands = await window.axios.getCommands(gameMode);
    const onlineLimiters = await window.axios.getChallengeLimiters(gameMode);
    const maps = await window.axios.getMaps(gameMode);
    const modifiers = await loadModifiers(gameMode);

    // ----------------------------------- CIVS Modifier ----------------------------------- \\
    if (modifiers?.civs?.length) {
        const civModifiers: Record<string, Record<string, boolean>> = {};
        for (const entry of (modifiers.civs)) {
            for (const challenge of entry.challenges) {
                const challengeCivMods = getDefault(civModifiers, challenge, {});
                entry.civs.forEach(civ => {
                    challengeCivMods[civ] = entry["civs-have-access-to-challenges"];
                })
            }
        }

        const remappedCivModifiers: Record<string, Array<string>> = {};
        for (const [challenge, civMods] of Object.entries(civModifiers)) {

            remappedCivModifiers[challenge] =
                Object.values(Civ)
                    .filter(civ => {
                        if (civ in civMods) return civMods[civ];
                        return true;
                    })
        }

        for (const category of Object.keys(challenges)) {
            for (const challenge of challenges[category]) {
                if (challenge.id in remappedCivModifiers) {
                    challenge.civs = Array.from(remappedCivModifiers[challenge.id]);
                }
            }
        }
    }

    // ----------------------------------- MAPS Modifier ----------------------------------- \\
    if (modifiers?.maps?.length) {
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

    // ----------------------------------- Limiters ----------------------------------- \\
    const limiters: Limiters = {};
    if (onlineLimiters) {
        for (const mu of onlineLimiters["mutually-exclusive"] || []) {
            for (let i = 0; i < mu.length; i++) {
                getDefault(limiters, mu[i], []).push(...mu.filter(k => k !== mu[i]))
            }
        }

        const otm = onlineLimiters["one-to-many"] || []
        for (const key of Object.keys(otm)) {
            getDefault(limiters, key, []).push(...otm[key])
            for (const item of otm[key]) {
                getDefault(limiters, item, []).push(key)
            }
        }
    }

    return {
        challenges: challenges,
        commands: commands,
        limiters: limiters,
        maps: maps
    }
}

export {loadGameMode}
