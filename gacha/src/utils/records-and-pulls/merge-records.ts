import dayjs from "dayjs";
import { sortRecords } from "./sort-records";
import type { GachaRecord } from "../../types/GachaRecord";

// Helper function to check if an array of records is sorted in ascending order by timestamp
function checkIfSorted<T extends { time: number }>(records: T[]): void {
  if (records.length < 2) return; // No need to check if there are less than 2 records
  for (let i = 1; i < records.length; i++) {
    const firstRecordTime = records[i - 1].time;
    const secondRecordTime = records[i].time;
    if (secondRecordTime < firstRecordTime) {
      throw new Error("Records are out of order!");
    }
  }
}
/**
 * Merges two arrays of records (e.g., pulls) into a single sorted array without duplication.
 * Ensures that the resulting array is in ascending order by timestamp.
 *
 * @param oldRecords - The existing array of records.
 * @param newRecords - The new array of records to merge.
 * @returns A merged and sorted array of records.
 */
export function mergeRecords<T extends GachaRecord>({
  oldRecords,
  newRecords,
}: {
  oldRecords: T[];
  newRecords: T[];
}): T[] {
  const sortedOldRecords = sortRecords(oldRecords);
  const sortedNewRecords = sortRecords(newRecords);
  checkIfSorted(sortedOldRecords);
  checkIfSorted(sortedNewRecords);
  if (sortedOldRecords.length === 0) {
    return sortedNewRecords;
  }
  if (sortedNewRecords.length === 0) {
    return sortedOldRecords;
  }
  // Check if oldRecords and newRecords are exactly the same
  if (JSON.stringify(sortedOldRecords) === JSON.stringify(sortedNewRecords)) {
    return sortedOldRecords;
  }
  const previousRecentRecord = sortedOldRecords[sortedOldRecords.length - 1];
  const previousRecentIndexInNewRecords = sortedNewRecords.findLastIndex(
    (record) =>
      record.item === previousRecentRecord.item &&
      record.pool_id === previousRecentRecord.pool_id &&
      record.time === previousRecentRecord.time
  );
  if (previousRecentIndexInNewRecords === -1) {
    const errorData = {
      sortedNewRecords,
      sortedOldRecords,
      firstNewRecordTimestamp: sortedNewRecords[0].time,
      firstOldRecordTimestamp: sortedOldRecords[0].time,
      lastOldRecordTimestamp:
        sortedOldRecords[sortedOldRecords.length - 1].time,
    };
    if (
      dayjs
        .unix(sortedNewRecords[0].time)
        .isBefore(dayjs.unix(sortedOldRecords[0].time))
    ) {
      const error = new Error(
        "Error merging records: It's impossible to append old records to a previous newer record. Aborting."
      );
      Object.assign(error, errorData);
      throw error;
    }
    if (
      dayjs
        .unix(sortedNewRecords[0].time)
        .isAfter(dayjs.unix(sortedOldRecords[0].time)) &&
      dayjs
        .unix(sortedNewRecords[0].time)
        .isBefore(
          dayjs.unix(sortedOldRecords[sortedOldRecords.length - 1].time)
        )
    ) {
      const error = new Error(
        "Error merging records: It's impossible to append new records 'in between' old records. Aborting."
      );
      Object.assign(error, errorData);
      throw error;
    }
    const recordsToReturn = [...sortedOldRecords, ...sortedNewRecords];
    checkIfSorted(recordsToReturn);
    return recordsToReturn;
  } else {
    const sortedNewRecordsWithoutOldRecords = sortedNewRecords.slice(
      previousRecentIndexInNewRecords + 1
    );
    const recordsToReturn = [
      ...sortedOldRecords,
      ...sortedNewRecordsWithoutOldRecords,
    ];
    checkIfSorted(recordsToReturn);
    return recordsToReturn;
  }
}
