interface Policies {
    economy: Challenge[] | Command[];
    military: Challenge[] | Command[];
    building: Challenge[] | Command[];
    technologies: Challenge[] | Command[];
    miscellaneous: Challenge[] | Command[];
}

interface Challenges {
    [key: string]: Challenge[];

    economy: Challenge[];
    military: Challenge[];
    building: Challenge[];
    technologies: Challenge[];
    miscellaneous: Challenge[];
}

interface Commands {
    [key: string]: Command[];

    economy: Command[];
    military: Command[];
    building: Command[];
    technologies: Command[];
    miscellaneous: Command[];
}

interface Challenge {
    [key: string]: string | string[] | number | ChallengePointsObject | undefined;

    id: string;
    name: string;
    points: number | ChallengePointsObject;
    selectedOption?: string;  // Added key to show which of PointObject was chosen
    display?: string;
    desc?: string;
    'dev-desc'?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface ChallengePointsObject {
    [key: string]: number;
}

interface Command {
    id: string;
    name: string;
    points: number | CommandPointsObject;
    selectedOption?: string;  // Added key to show which of PointObject was chosen
    display?: string;
    maxRepeat?: number;
    desc?: string;
    'dev-desc'?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface CommandPointsObject {
    [key: string]: number | PointRepeatObject;
}

interface PointRepeatObject {
    [key: string]: string | number;

    cost: number;
    repeat: number;
}

interface Points {
    [key: string]: number;

    economy: number;
    military: number;
    building: number;
    technologies: number;
    miscellaneous: number;
    wildPoints: number;
}

interface CategoryPoints {
    [key: string]: number;

    economy: number;
    military: number;
    building: number;
    technologies: number;
    miscellaneous: number;
}

export {
    Policies, Challenges, Challenge, Commands, Command,
    ChallengePointsObject, CommandPointsObject, PointRepeatObject,
    Points, CategoryPoints
}


