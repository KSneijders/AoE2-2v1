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
    [key: string]: string | string[] | number | PointObject | undefined;

    id: string;
    name: string;
    points: number | PointObject;
    selectedOption?: string;  // Added key to show which of PointObject was chosen
    desc?: string;
    'dev-desc'?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface Command {
    id: string;
    name: string;
    points: number | PointObject;
    selectedOption?: string;  // Added key to show which of PointObject was chosen
    max_repeat?: number;
    desc?: string;
    'dev-desc'?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface PointObject {
    [key: string]: number;
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

export {Policies, Challenges, Challenge, Commands, Command, PointObject, Points, CategoryPoints}


