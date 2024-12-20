import type { Pull } from "../../types/Pull"
import type { PullWithNumber } from "../../types/PullWithNumber"
import { sortRecords } from "./sort-records"

export function convertPullsToPullsWithNumbers(
  rawPulls: Pull[],
  previousPullNumber = 0,
  previousPity4 = 0,
  previousPity5 = 0,
): PullWithNumber[] {
  const pulls = sortRecords(rawPulls)

  let pity4 = previousPity4,
    pity5 = previousPity5

  return pulls.map((p, i) => {
    const toReturn = {
      num: previousPullNumber + i + 1,
      p4: pity4 + 1,
      p5: pity5 + 1,
      ...p,
    }

    switch (p.rarity) {
      case "SR":
        pity4 = 0
        pity5++
        break
      case "SSR":
        pity5 = 0
        pity4 = 0
        break
      default:
        pity4++
        pity5++
    }

    return toReturn
  })
}
