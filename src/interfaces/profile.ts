import {Side} from "@/enums/gamemode-overlay";

interface Profile {
    [key: string]: string | number;

    name: string;
    points: number;
    id: string;
    colour: string;
}

interface ProfileEntry {
    [key: string]: string | Side;

    name: string;
    id: string;
    side: Side;
    colour: string;
}

export {Profile, ProfileEntry};