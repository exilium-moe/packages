import type { GachaRecord } from "../../types/GachaRecord";

/**
 * Type for records that need to be sorted (contains the `time` field).
 * You can extend this type with any other fields that should be present in the sorted records.
 */
export type SortableRecord = {
  time: number; // The `time` field required for sorting
  isSorted?: boolean; // Optional field to mark the record as sorted
  group?: number; // Optional after calling `getSortedPullsFromGachaRecord`
  [key: string]: any; // eslint-disable-line
};

/**
 * Sorts an array of records from [Newest -> Oldest] to [Oldest -> Newest].
 *
 * This works for both `GachaRecord` and `Pull`, as they share common properties.
 *
 * @param rawRecords - Array of records to sort.
 * @returns Sorted array of records.
 */
export function sortRecords<T extends SortableRecord>(rawRecords: T[]): T[] {
  if (rawRecords.length === 0) {
    return [];
  }

  const records = rawRecords.slice();
  const FIRST_RECORD = records[0];
  const LAST_RECORD = records[records.length - 1];
  const IS_FIRST_RECORD_OLDER = FIRST_RECORD.time < LAST_RECORD.time;
  const IS_LAST_RECORD_OLDER = LAST_RECORD.time < FIRST_RECORD.time;
  const ALREADY_SORTED = FIRST_RECORD.isSorted && LAST_RECORD.isSorted;
  const IS_TEN_PULL =
    records.length === 10 && records.every((r) => r.time === records[0].time);

  // It's sorted, but in Newest -> Oldest, so reverse them again to Oldest -> Newest
  if (IS_LAST_RECORD_OLDER && FIRST_RECORD.isSorted && LAST_RECORD.isSorted) {
    return records.reverse();
  }

  if (ALREADY_SORTED) {
    // If it's a solo 10-pull, sort it by group
    if (IS_TEN_PULL && records.every(hasGroup)) {
      return records.sort((a, b) => {
        return Number(a.group) - Number(b.group);
      });
    } else {
      // Already sorted, do nothing
      return records;
    }
  }

  // If there are only 10 pulls and it's not yet sorted
  if (IS_TEN_PULL) {
    return records.reverse().map((record) => ({ ...record, isSorted: true }));
  }

  // Handle cases where the records are already sorted, but not marked as isSorted
  if (IS_FIRST_RECORD_OLDER) {
    return records.map((record) => ({ ...record, isSorted: true }));
  }

  // Reverse and mark as sorted
  return records.reverse().map((record) => ({ ...record, isSorted: true }));
}

/**
 * Utility to check if a record has a group number already from `getSortedPullsFromGachaRecordApiResponse`
 */
function hasGroup(
  record: SortableRecord
): record is SortableRecord & { group: number } {
  return record.group !== undefined;
}
