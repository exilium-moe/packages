import type { GachaRecord } from "../../types/GachaRecord"
import type { Pull } from "../../types/Pull"

export function convertPullsToGachaRecords(pulls: Pull[]): GachaRecord[] {
  return pulls.map(pull => {
    return {
      pool_id: pull.item,
      item: pull.item,
      time: pull.time,
      isSorted: pull.isSorted,
    }
  })
}
