import {ProfileEntry} from "@/interfaces/profile";

type TabData = string | CivSelection | ProfileEntry[] | undefined

interface OverlayTabData {
    [key: string]: TabData;

    players: ProfileEntry[];
    maps: string;
    civs: CivSelection;
}

interface CivSelection {
    [key: string]: string | string[];

    civOptions: string[];
    civChoice: string;
}

export {OverlayTabData, TabData, CivSelection}