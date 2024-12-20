import { GachaRecordProcessor } from "."
import type { GachaRecord } from "../../types/GachaRecord"

/**
 * @satisfies We assume all pages (10-pulls) are uploaded at the same time, so we only return NEW pulls with greater time.
 *
 * @param param
 * @returns
 */
export function getNewRecordsOnly<T extends GachaRecord>({
  oldRecords,
  newRecords,
}: {
  oldRecords: T[]
  newRecords: T[]
}): T[] {
  const sortedOldRecords = GachaRecordProcessor.sort(oldRecords)
  const sortedNewRecords = GachaRecordProcessor.sort(newRecords)

  if (sortedOldRecords.length === 0) {
    return sortedNewRecords // All new records if no old records exist
  }

  const latestOldRecord = sortedOldRecords[sortedOldRecords.length - 1]

  // Filter new records to only include those with a time later than the latest old record
  return sortedNewRecords.filter(record => record.time > latestOldRecord.time)
}
