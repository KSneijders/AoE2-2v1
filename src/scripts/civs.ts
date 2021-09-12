import {Civ} from "@/enums/civs";
import {shuffle} from "@/scripts/arrays";

function getRandomCivs(n: number): string[] {
    return shuffle(Object.values(Civ)).slice(0, n);
}

export {getRandomCivs}
