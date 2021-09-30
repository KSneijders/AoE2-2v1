import {Challenges} from "@/interfaces/policies";
import {Limiters} from "@/interfaces/limiters";

interface GameModeMenuItem {
    title: string;
    id: string;
    desc: string;
}

interface GameModeContent {
    challenges: Challenges;
    limiters: Limiters;
}

export {GameModeMenuItem, GameModeContent}