interface Challenges {
    economy: Challenge[];
    military: Challenge[];
    building: Challenge[];
    technologies: Challenge[];
    miscellaneous: Challenge[];
}

interface Commands {
    commands: Command[];
}

interface Challenge {
    id: string;
    name: string;
    points: number | PointObject;
    desc?: string;
    dev_desc?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface Command {
    id: string;
    name: string;
    points: number | PointCommandObject;
    max_repeat?: number;
    desc?: string;
    dev_desc?: string;
    classes?: string[];
    civs?: string[];
    maps?: string[];
}

interface PointObject {
    [key: string]: number;
}

interface PointCommandObject {
    [key: string]: number | number[];
}

export {Challenges, Challenge, Commands, Command, PointObject, PointCommandObject}


