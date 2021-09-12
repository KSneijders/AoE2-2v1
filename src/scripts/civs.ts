import {Civ} from "@/enums/civs";
import {shuffle} from "@/scripts/arrays";

/**
 * Get n random civs
 *
 * @param n the amount of random civs to return
 */
function getRandomCivs(n: number): string[] {
    return shuffle(Object.values(Civ)).slice(0, n);
}

export {getRandomCivs}
