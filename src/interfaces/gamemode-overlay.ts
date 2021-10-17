import {ProfileEntry} from "@/interfaces/profile";
import {Challenge, Command} from "@/interfaces/policies";
import ChallengeCollection from "@/classes/challenge-collection";
import CommandCollection from "@/classes/command-collection";

type TabData = string | number | boolean | Options<string> | ProfileEntry[] | ChallengeData | CommandData | undefined

interface OverlayConfigData {
    [key: string]: TabData;

    players: ProfileEntry[];
    points: number;
    maps: string;
    civs: Options<string>;
    challenges: ChallengeData;
    commands: CommandData;
}

interface ChallengeData {
    [key: string]: Challenge[] | Options<Challenge[]> | ChallengeCollection | number | undefined;

    collection: Challenge[];
    quantity: number;
    cc: ChallengeCollection | undefined;
    options: Options<Challenge[]>;
}

interface CommandData {
    [key: string]: Command[] | Options<Command[]> | CommandCollection | number | undefined;

    collection: Command[];
    quantity: number;
    cc: CommandCollection | undefined;
    options: Options<Command[]>;
}

interface Options<T> {
    [key: string]: number | T[];
    
    options: T[];
    choiceIndex: number;
}

export {OverlayConfigData, TabData, Options, ChallengeData, CommandData}