/**
 * Get a value based on the object and key. If the key is not present, create it with the default value.
 *
 * @param obj The object to get the value from
 * @param key The key to look for the value
 * @param default_ The value to set when the key isn't present
 */
function getDefault <T>(obj: Record<string, T>, key: string, default_: T): T {
    if (!(key in obj)) obj[key] = default_
    return obj[key]
}

export {getDefault}