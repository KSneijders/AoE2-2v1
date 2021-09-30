interface OnlineLimiters {
    "mutually-exclusive": string[][];
    "one-to-many": LimiterEntry;
}

interface LimiterEntry {
    [key: string]: string[];
}

interface Limiters {
    [key: string]: string[];
}

export {Limiters, OnlineLimiters, LimiterEntry}