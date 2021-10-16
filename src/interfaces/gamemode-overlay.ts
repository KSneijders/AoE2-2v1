import {ProfileEntry} from "@/interfaces/profile";
import {Challenge, Command} from "@/interfaces/policies";
import ChallengeCollection from "@/classes/challenge-collection";
import CommandCollection from "@/classes/command-collection";

type TabData = string | boolean | CivSelection | ProfileEntry[] | ChallengeData | CommandData | undefined

interface OverlayConfigData {
    [key: string]: TabData;

    players: ProfileEntry[];
    maps: string;
    civs: CivSelection;
    challenges: ChallengeData;
    commands: CommandData;
}

interface ChallengeData {
    [key: string]: Challenge[] | ChallengeCollection | number | undefined;

    collection: Challenge[];
    rerolls: number;
    cc: ChallengeCollection | undefined;
}

interface CommandData {
    [key: string]: Command[] | CommandCollection | number | undefined;

    collection: Command[];
    rerolls: number;
    cc: CommandCollection | undefined;
}

interface CivSelection {
    [key: string]: string | string[];

    civOptions: string[];
    civChoice: string;
}

export {OverlayConfigData, TabData, CivSelection, ChallengeData, CommandData}