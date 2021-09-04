import {RsPick, RsType} from "@/enums/ruleset";

interface Ruleset {
    challenges: RsPolicies;
    commands: RsPolicies;
    civ: RsCiv;
    map: RsMap;
}

interface RsPolicies {
    enabled: boolean;
    pick: RsPick;
    points_distribution: {
        economy: RsPointsDistribution;
        military: RsPointsDistribution;
        buildings: RsPointsDistribution;
        technologies: RsPointsDistribution;
        miscellaneous: RsPointsDistribution;
        wild_points: RsWildPoints;
    }
}

interface RsPointsDistribution {
    enabled: boolean;
    min_quantity: number | null;
    max_quantity: number | null;
    type: RsType;
    wild_points: boolean;
}

interface RsWildPoints {
    enabled: boolean;
    quantity: number;
    type: RsType;
}

interface RsCiv {
    defendants: RsPlayerCiv;
    challengers: RsPlayerCiv;
}

interface RsPlayerCiv {
    quantity: number;
    type: RsType;
    pick: RsPick;
}

interface RsMap {
    quantity: number;
    pick: RsPick;
}

export {Ruleset, RsPolicies, RsPointsDistribution, RsWildPoints, RsCiv, RsPlayerCiv, RsMap};