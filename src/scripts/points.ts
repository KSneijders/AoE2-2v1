import {Points} from "@/interfaces/policies";
import {createArray, sum} from "@/scripts/arrays";

/**
 * Generate random points based on total and wild point percentage
 *
 * @param totalPoints The total amount of points
 * @param wildPointPercentage The percentage to be dedicated to wild points (0 = 0%, 0.5 = 50%, 1 = 100%)
 */
function randomPoints(totalPoints: number, wildPointPercentage: number): Points {
    let wildPoints = Math.floor(totalPoints * wildPointPercentage);
    totalPoints = totalPoints - wildPoints;

    const randoms = createArray(5).map(() => Math.random())
    const randomSum = sum(randoms)
    const randomPoints = randoms.map(r => r / randomSum * totalPoints)
    const randomPointsSum = sum(randomPoints)

    wildPoints += (totalPoints - randomPointsSum)

    return {
        economy: randomPoints[0],
        technologies: randomPoints[1],
        miscellaneous: randomPoints[2],
        military: randomPoints[3],
        building: randomPoints[4],
        wildPoints: wildPoints,
    } as Points
}

export {randomPoints}
