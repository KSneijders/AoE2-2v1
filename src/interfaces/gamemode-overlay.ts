import {ProfileEntry} from "@/interfaces/profile";
import {Challenge, Command} from "@/interfaces/policies";

type TabData = string | boolean | CivSelection | ProfileEntry[] | PolicySet | undefined

interface OverlayConfigData {
    [key: string]: TabData;

    players: ProfileEntry[];
    maps: string;
    civs: CivSelection;
    policies: PolicySet;
    policyRefresh: boolean;
}

interface PolicySet {
    [key: string]: Challenge[] | Command[];

    challenges: Challenge[];
    commands: Command[];
}

interface CivSelection {
    [key: string]: string | string[];

    civOptions: string[];
    civChoice: string;
}

export {OverlayConfigData, TabData, CivSelection, PolicySet}