import type { PullWithNumber } from "../../types/PullWithNumber"
import type { PullForDb } from "../../types/PullForDb"
import type { ServerEnum } from "@exilium-moe/shared/types/ServerEnum"
import type { CardPoolTypeEnum } from "../../types/CardPoolTypeEnum"
import { unixToIsoString } from "../unix-to-iso-string"

type Params = {
  pulls: PullWithNumber[]
  uid: number
  server: ServerEnum
  cardPoolType: CardPoolTypeEnum
}

export function convertPullsWithNumbersToPullsForDb({ pulls, uid, server, cardPoolType }: Params): PullForDb[] {
  return pulls.map(pull => {
    return {
      ...pull,
      uid,
      server,
      cardPoolType,
      isSorted: pull.isSorted ? true : false,
      time: unixToIsoString(pull.time),
    }
  })
}
