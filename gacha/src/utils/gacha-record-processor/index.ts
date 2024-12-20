import type { GachaRecord } from "../../types/GachaRecord"
import type { Pull } from "../../types/Pull"
import type { PullWithNumber } from "../../types/PullWithNumber"
import type { ServerEnum } from "@exilium-moe/shared/types/ServerEnum"
import type { CardPoolTypeEnum } from "../../types/CardPoolTypeEnum"
import { characters } from "../../data/characters"
import { weapons } from "../../data/weapons"
import { sortRecords } from "./sort-records"
import { mergeRecords } from "./merge-records"
import { convertPullsToPullsWithNumbers } from "./convert-pulls-to-pulls-with-numbers"
import { convertPullsToGachaRecords } from "./convert-pulls-to-gacha-records"
import { convertPullsWithNumbersToPullsForDb } from "./convert-pulls-with-numbers-to-pulls-for-db"
import { getNewRecordsOnly } from "./get-new-records-only"
import type { PullForDb } from "../../types/PullForDb"

export const GachaRecordProcessor = (() => {
  const create = (rawRecords: GachaRecord[] = []) => {
    const records = [...rawRecords]

    const toPulls = (): Pull[] => {
      return records.map(record => {
        const itemEquivalent = characters.find(c => c.id === record.item) ?? weapons.find(w => w.id === record.item)

        return {
          ...record,
          name: itemEquivalent?.name ?? "NUL",
          rarity: itemEquivalent?.rarity ?? "NUL",
        }
      })
    }

    const toSortedPulls = (): Pull[] => {
      const pulls = toPulls()
      return sortRecords(pulls)
    }

    const getRecords = () => records

    return { toPulls, toSortedPulls, getRecords }
  }

  const merge = <T extends GachaRecord>({ oldRecords, newRecords }: { oldRecords: T[]; newRecords: T[] }) => {
    return mergeRecords({ oldRecords, newRecords })
  }

  const filterNewRecords = <T extends GachaRecord>({
    oldRecords,
    newRecords,
  }: {
    oldRecords: T[]
    newRecords: T[]
  }) => {
    return getNewRecordsOnly({ oldRecords, newRecords })
  }

  const sort = <T extends GachaRecord>(rawRecords: T[] = []): T[] => {
    return sortRecords(rawRecords)
  }

  const sortPullsWithNumbers = <T extends GachaRecord>(
    rawRecords: T[] = [],
    previousPullNumber = 0,
    previousPity4 = 0,
    previousPity5 = 0,
  ): PullWithNumber[] => {
    const processor = create(rawRecords)
    const pulls = processor.toPulls()

    return convertPullsToPullsWithNumbers(pulls, previousPullNumber, previousPity4, previousPity5)
  }

  const trimPullsToRecords = <T extends Pull>(pulls: T[] = []) => {
    return convertPullsToGachaRecords(pulls)
  }

  const serializePullsWithNumbersForDb = (
    {
      pulls,
      uid,
      server,
      cardPoolType,
    }: {
      pulls: PullWithNumber[]
      uid: number
      server: ServerEnum
      cardPoolType: CardPoolTypeEnum
    },
    previousPullNumber: number,
    previousPity4: number,
    previousPity5: number,
  ): PullForDb[] => {
    const pullsToInsert = sortPullsWithNumbers(pulls, previousPullNumber, previousPity4, previousPity5)

    return convertPullsWithNumbersToPullsForDb({
      pulls: pullsToInsert,
      uid,
      server,
      cardPoolType,
    })
  }

  return {
    create,
    merge,
    filterNewRecords,
    sort,
    sortPullsWithNumbers,
    trimPullsToRecords,
    serializePullsWithNumbersForDb,
  }
})()
