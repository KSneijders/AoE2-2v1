import {ProfileEntry} from "@/interfaces/profile";

type TabData = ProfileEntry[] | undefined

interface OverlayTabData {
    [key: string]: TabData;

    players: ProfileEntry[];
}

export {OverlayTabData, TabData}