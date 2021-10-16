import {ProfileEntry} from "@/interfaces/profile";
import {Challenge, Command} from "@/interfaces/policies";

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
    [key: string]: Challenge[] | number;

    collection: Challenge[];
    rerolls: number;
}

interface CommandData {
    [key: string]: Command[] | number;

    collection: Command[];
    rerolls: number;
}

interface CivSelection {
    [key: string]: string | string[];

    civOptions: string[];
    civChoice: string;
}

export {OverlayConfigData, TabData, CivSelection, ChallengeData, CommandData}