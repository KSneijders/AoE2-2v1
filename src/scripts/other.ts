function jsonDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export {jsonDeepCopy}