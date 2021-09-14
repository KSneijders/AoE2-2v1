interface CivModifier {
    'civs-have-access-to-challenges': boolean;
    civs: string[];
    challenges: string[];
}

interface MapModifier {
    'maps-allow-challenges': boolean;
    maps: string[];
    challenges: string[];
}

export {CivModifier, MapModifier}