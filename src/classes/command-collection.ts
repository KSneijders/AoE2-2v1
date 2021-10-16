import {CategoryPoints, Command, Commands, PointObject} from "@/interfaces/policies";
import {sample, shuffle} from "@/scripts/arrays";
import {jsonDeepCopy} from "@/scripts/other";
import {PolicyCategories} from "@/enums/policies";

interface CommandIdMap {
    [key: string]: (string | number)[];
}

interface IgnoreIndexes {
    [key: string]: number[];
}

class CommandCollection {
    private readonly maxIterations = 1000;

    private readonly initialCommands: Commands;
    private readonly initialPoints: number;

    private commandIdMap: CommandIdMap;
    private shuffled: boolean;

    commands: Commands;
    points: number;

    constructor(commands: Commands, points: number, shuffle = false) {
        this.initialCommands = jsonDeepCopy(commands);
        this.initialPoints = Math.floor(points / 2);

        this.commands = jsonDeepCopy(this.initialCommands);
        this.points = this.initialPoints;

        this.commandIdMap = {};
        this.shuffled = shuffle;

        if (shuffle) this.shuffleCommands();
    }

    reInitialise(): void {
        this.points = this.initialPoints;
        this.commands = jsonDeepCopy(this.initialCommands);
    }

    reroll(): Command[] {
        if (!this.shuffled) throw new Error("Cannot reroll if commands weren't shuffled before")

        this.reInitialise();
        this.shuffleCommands();
        return this.getRandomCommands();
    }

    resetCommandIdMap(): void {
        this.commandIdMap = {};
        for (const category of Object.keys(this.commands)) {
            for (const [index, command] of this.commands[category].entries()) {
                this.commandIdMap[command.id] = [category, index]
            }
        }
    }

    shuffleCommands(): void {
        for (const key of Object.keys(this.commands)) {
            shuffle(this.commands[key])
        }
        this.shuffled = true;
        this.resetCommandIdMap();
    }

    getRandomCommands(): Command[] {
        if (!this.shuffled) throw Error("Cannot get random commands without shuffling commands.");

        let keys = Object.values(PolicyCategories);
        const ignoreIndexes: IgnoreIndexes = {}
        const commands: Command[] = []

        const indexProgress: CategoryPoints = {economy: 0, building: 0, military: 0, miscellaneous: 0, technologies: 0}
        Object.keys(this.commands).forEach(c => ignoreIndexes[c] = [])

        for (let i = 0; i <= this.maxIterations; i++) {
            const key = sample(keys);
            if (key === undefined) break;

            const command = this.chooseFirstAllowedCommand(key, ignoreIndexes, indexProgress);
            console.log(command)
            if (command === undefined) {
                keys = keys.filter(k => k != key);
                continue;
            }

            commands.push(command)

            if (i === this.maxIterations) throw Error(`Maximum CommandCollection iterations reached (${i}).`);
        }

        return commands;
    }

    private chooseFirstAllowedCommand(key: string, ignoreIndexes: IgnoreIndexes, indexProgress: CategoryPoints): Command | undefined {
        for (let i = indexProgress[key] + 1; i < this.commands[key].length; i++) {
            if (ignoreIndexes[key].includes(i)) continue
            indexProgress[key] = i;

            const command = this.commands[key][indexProgress[key]];
            let cost: number;
            if (typeof command.points === "object") {
                const selectedOption = this.selectRandomOption(command)
                if (selectedOption === undefined) continue
                cost = command.points[selectedOption]
            } else {
                cost = command.points
            }

            if (cost <= this.points) {
                this.points -= cost;
                return command;
            }
        }

        return undefined;
    }

    private selectRandomOption(command: Command): string {
        let options = Object.keys(command.points as PointObject)
        options = options.filter(k => (command.points as PointObject)[k] <= this.points)
        return command.selectedOption = sample(options);
    }
}

export default CommandCollection