/**
 * Values for sorting challenges based on their classes. The lower the value the higher in the list.
 * The 'instant' and 4 age classes are in a separate list to the rest of the challenges.
 */
const classValues: Record<string, number> = {
    'instant': 0,
    'dark': 10,
    'feudal': 20,
    'castle': 30,
    'imp': 40,
    'game-changing': 100,
}

export {classValues}