/**
 * Deep copy object using JSON parse & JSON stringify.
 * Cannot deep copy all object, only simple implementations (like from dynamics branch)
 *
 * @param obj the object to be deep copied
 */
function jsonDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export {jsonDeepCopy}