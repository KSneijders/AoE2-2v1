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

/**
 * Remove illegal characters from the string and replace them with '_'.
 *
 * @param str the string to replace
 */
function stripIllegalChars(str: string): string {
    return str.replace(/[/\\?%*:|"<>]/g, '_');
}

/**
 * Format string function. Replaces "{0}" with first argument, {1} with the second etc.
 *
 * @param str The string to format
 * @param args The arguments to insert into the given string
 *
 * @author KooiInc @ https://stackoverflow.com/a/25227174/7230293
 */
function strFormat(str: string, ...args: string[]): string {
    return str.replace(/({\d+})/g, a => args[+(a.substr(1, a.length - 2)) || 0] );
}

function formatSummary(summary: string[]): string {
    if (!summary.length) return "";

    if (summary.length === 1) {
        return summary[0];
    } else if (summary.length === 2) {
        return summary.join(' & ');
    }
    return summary.slice(0, summary.length - 1).join(', ') + ' & ' + summary.slice(-1);
}

export {strReplaceKeyValue, stripIllegalChars, strFormat, formatSummary}