import {Side} from "@/enums/gamemode-overlay";

interface Profile {
    name: string;
    points: number;
}

interface ProfileEntry {
    name: string;
    side: Side;
}

export {Profile, ProfileEntry};