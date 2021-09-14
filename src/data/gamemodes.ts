import {GameModeMenuItem} from "@/interfaces/game-mode";

export const GameModes: Record<string, GameModeMenuItem> = {
    "random": {
        "title": "Random",
        "id": "random",
        "desc": "Challenges or Commands, Civs and Maps are all completely randomized!"
    },
    "free": {
        "title": "Free Pick",
        "id": "free",
        "desc": "Pick your own Challenges, Commands, Civs and the map."
    },
    "mode3": {
        "title": "Another Mode",
        "id": "mode3",
        "desc": "Some description about this mode to fill the space."
    },
    "no_commands": {
        "title": "No Commands",
        "id": "no_commands",
        "desc": "Just no commands. More PAIN in the challenges!!!!!"
    },
    "no_challenges": {
        "title": "No Challenges",
        "id": "no_challenges",
        "desc": "No challenges. Just a bazillion commands. "
    },
}