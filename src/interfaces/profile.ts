import {Side} from "@/enums/other";

interface Profile {
    name: string;
    points: number;
}

interface ProfileEntry {
    name: string;
    side: Side;
}

export {Profile, ProfileEntry};