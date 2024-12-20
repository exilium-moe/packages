import { describe, test, expect } from "vitest"
import { getNewRecordsOnly } from "./get-new-records-only"

describe("getNewRecordsOnly", () => {
  const oldRecords = [
    {
      isSorted: true,
      pool_id: 1,
      item: 1,
      time: new Date("2023-01-01T00:00:00Z").getTime(),
      name: "Pull 1",
    },
    {
      isSorted: true,
      pool_id: 1,
      item: 2,
      time: new Date("2023-01-02T00:00:00Z").getTime(),
      name: "Pull 2",
    },
  ]

  const newRecords = [
    {
      isSorted: true,
      pool_id: 1,
      item: 2,
      time: new Date("2023-01-02T00:00:00Z").getTime(),
      name: "Pull 2",
    },
    {
      isSorted: true,
      pool_id: 1,
      item: 3,
      time: new Date("2023-01-03T00:00:00Z").getTime(),
      name: "Pull 3",
    },
    {
      isSorted: true,
      pool_id: 1,
      item: 4,
      time: new Date("2023-01-04T00:00:00Z").getTime(),
      name: "Pull 4",
    },
  ]

  test("returns all new records when no old records exist", () => {
    const result = getNewRecordsOnly({ oldRecords: [], newRecords })
    expect(result).toEqual(newRecords)
  })

  test("returns nothing when they are the same", () => {
    const result = getNewRecordsOnly({ oldRecords, newRecords: oldRecords })
    expect(result).toEqual([])
  })

  test("returns only new records after the most recent old record", () => {
    const result = getNewRecordsOnly({ oldRecords, newRecords })
    expect(result).toEqual([
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 4,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
      },
    ])
  })

  test("returns no records if new records are all already stored", () => {
    const identicalNewRecords = [
      {
        isSorted: true,
        pool_id: 1,
        item: 1,
        time: new Date("2023-01-01T00:00:00Z").getTime(),
        name: "Pull 1",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2",
      },
    ]
    const result = getNewRecordsOnly({
      oldRecords,
      newRecords: identicalNewRecords,
    })
    expect(result).toEqual([])
  })

  test("handles unordered old and new records by sorting them", () => {
    const unorderedOldRecords = [
      {
        isSorted: false,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2",
      },
      {
        isSorted: false,
        pool_id: 1,
        item: 1,
        time: new Date("2023-01-01T00:00:00Z").getTime(),
        name: "Pull 1",
      },
    ]

    const unorderedNewRecords = [
      {
        isSorted: false,
        pool_id: 1,
        item: 4,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
      },
      {
        isSorted: false,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
      {
        isSorted: false,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2",
      },
    ]

    const result = getNewRecordsOnly({
      oldRecords: unorderedOldRecords,
      newRecords: unorderedNewRecords,
    })

    expect(result).toEqual([
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 4,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
      },
    ])
  })

  test("returns all new records if no matching old record exists", () => {
    const oldRecordsDifferent = [
      {
        isSorted: true,
        pool_id: 2,
        item: 1,
        time: new Date("2023-01-01T00:00:00Z").getTime(),
        name: "Pull 1",
      },
    ]

    const result = getNewRecordsOnly({
      oldRecords: oldRecordsDifferent,
      newRecords,
    })
    expect(result).toEqual(newRecords)
  })

  test("handles empty new records", () => {
    const result = getNewRecordsOnly({ oldRecords, newRecords: [] })
    expect(result).toEqual([])
  })

  test("excludes new records with time earlier than the latest old record", () => {
    const modifiedNewRecords = [
      {
        isSorted: true,
        pool_id: 1,
        item: 0, // Older than the oldest old record
        time: new Date("2022-12-31T00:00:00Z").getTime(),
        name: "Pull 0",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(), // New valid record
        name: "Pull 3",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 4,
        time: new Date("2023-01-04T00:00:00Z").getTime(), // New valid record
        name: "Pull 4",
      },
    ]

    const result = getNewRecordsOnly({
      oldRecords,
      newRecords: modifiedNewRecords,
    })

    expect(result).toEqual([
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 4,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
      },
    ])
  })

  test("handles duplicate records with the same time and item in newRecords", () => {
    const oldRecords = [
      {
        isSorted: true,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2",
      },
    ]

    const newRecords = [
      {
        isSorted: true,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2",
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 2,
        time: new Date("2023-01-02T00:00:00Z").getTime(),
        name: "Pull 2", // Duplicate
      },
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
    ]

    const result = getNewRecordsOnly({ oldRecords, newRecords })

    expect(result).toEqual([
      {
        isSorted: true,
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
      },
    ])
  })
})
