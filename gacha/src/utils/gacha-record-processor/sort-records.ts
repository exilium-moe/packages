import type { GachaRecord } from "../../types/GachaRecord"

/**
 * Sorts an array of records from [Newest -> Oldest] to [Oldest -> Newest].
 *
 * This works for both `GachaRecord` and `Pull`, as they share common properties.
 *
 * @param rawRecords - Array of records to sort.
 * @returns Sorted array of records.
 */
export function sortRecords<T extends GachaRecord>(rawRecords: T[]): T[] {
  if (rawRecords.length === 0) {
    return []
  }

  const records = [...rawRecords]
  const FIRST_RECORD = records[0]
  const LAST_RECORD = records[records.length - 1]
  const IS_FIRST_RECORD_OLDER = FIRST_RECORD.time < LAST_RECORD.time

  // Already sorted, do nothing
  if (FIRST_RECORD.isSorted && LAST_RECORD.isSorted) {
    return records
  }

  // Handle cases where the records are already sorted
  if (IS_FIRST_RECORD_OLDER) {
    return records.map(record => ({ ...record, isSorted: true }))
  }

  // Reverse and mark as sorted
  return records.reverse().map(record => ({ ...record, isSorted: true }))
}
