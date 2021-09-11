/**
 * Create array with values from 0 to n
 *
 * @param n exclusive end of the array values
 */
function range(n: number): number[] {
    return [...Array(n).keys()]
}

/**
 * Get a random entry (sample) from the given array
 *
 * @param arr array to choose sample from
 */
function sample<T>(arr: T[]): T {
    return arr[Math.floor(Math.random()*arr.length)];
}

/**
 * Shuffles array in place.
 *
 * @param {Array} arr items An array containing the items.
 */
function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Create array with undefined values of size given by length\
 *
 * @param length the size of the created array
 */
function createArray(length: number): undefined[] {
    return Array.from(Array(length))
}

/**
 * Get sum of all numbers in array
 *
 * @param arr the array to get the sum from
 */
function sum(arr: number[]): number {
    let sum = 0;
    let i = arr.length;
    while (i--) sum += arr[i];
    return sum;
}

export {sample, sum, createArray, range, shuffle}
