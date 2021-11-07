/**
 * Get a value based on the object and key. If the key is not present, create it with the default value.
 *
 * @param obj The object to get the value from
 * @param key The key to look for the value
 * @param default_ The value to set when the key isn't present
 */
import {GenericObject} from "@/interfaces/object";

function getDefault<T>(obj: Record<string, T>, key: string, default_: T): T {
    if (!(key in obj)) obj[key] = default_
    return obj[key]
}

/**
 * Filter a (nested) object based on it's keys
 *
 * @param obj The object to filter
 * @param disallowed The list with keys separated with a '.'
 *
 * Example:
 *      obj = {a: {b: 2, c: 3}, b: {c: 4, d: 5}}
 *      disallowed = ['a.c', 'b.c']
 *
 *      result = {a: {b: 2}, b: {d: 5}}
 */
function filterObject(obj: GenericObject, disallowed: string[]): GenericObject {
    const keys: string[] = Object.keys(obj).filter(key => !disallowed.includes(key));
    const filteredKeyMap: Array<Record<string, string[]>> = keys.map(key => {
        return {[key]: Object.keys(obj[key]).filter(key2 => !disallowed.includes(`${key}.${key2}`))}
    })
    return filteredKeyMap.reduce((newObj: GenericObject, keys: Record<string, string[]>) => {
        Object.keys(keys).forEach(key => {
            newObj[key] = {};
            keys[key].forEach(key2 => {
                newObj[key][key2] = obj[key][key2];
            });
        });
        return newObj;
    }, {})
}


export {getDefault, filterObject}