/**
 * String replace based on object. Keys will be replaced by values.
 *
 * @param str The string to call replace upon.
 * @param obj The object with key value pairs.
 */
function strReplaceKeyValue(str: string, obj: Record<string, string>): string {
    for (const key of Object.keys(obj)) {
        str = str.replace(key, obj[key])
    }
    return str;
}

export {strReplaceKeyValue}