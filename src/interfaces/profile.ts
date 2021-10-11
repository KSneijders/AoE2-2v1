import {Side} from "@/enums/gamemode-overlay";

interface Profile {
    [key: string]: string | number;

    name: string;
    points: number;
    id: string;
}

interface ProfileEntry {
    name: string;
    side: Side;
}

export {Profile, ProfileEntry};