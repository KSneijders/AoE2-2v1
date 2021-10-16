import {Challenges, Commands} from "@/interfaces/policies";
import {Limiters} from "@/interfaces/limiters";

interface GameModeMenuItem {
    title: string;
    id: string;
    desc: string;
}

interface GameModeContent {
    commands: Commands;
    challenges: Challenges;
    limiters: Limiters;
    maps: string[];
}

export {GameModeMenuItem, GameModeContent}