import { describe, test, expect } from "vitest"
import { mergeRecords } from "./merge-records"

describe("mergeRecords", () => {
  const oldRecords = [
    {
      pool_id: 1,
      item: 5,
      time: new Date("2023-01-01T00:00:00Z").getTime(),
      name: "Pull 1",
      rarity: "SSR",
      isSorted: true,
    },
    {
      pool_id: 1,
      item: 4,
      time: new Date("2023-01-02T00:00:00Z").getTime(),
      name: "Pull 2",
      rarity: "SR",
      isSorted: true,
    },
    {
      pool_id: 1,
      item: 3,
      time: new Date("2023-01-03T00:00:00Z").getTime(),
      name: "Pull 3",
      rarity: "R",
      isSorted: true,
    },
  ]

  const newRecords = [
    {
      pool_id: 1,
      item: 4,
      time: new Date("2023-01-02T00:00:00Z").getTime(),
      name: "Pull 2",
      rarity: "SR",
      isSorted: false,
    },
    {
      pool_id: 1,
      item: 3,
      time: new Date("2023-01-03T00:00:00Z").getTime(),
      name: "Pull 3",
      rarity: "R",
      isSorted: false,
    },
    {
      pool_id: 1,
      item: 5,
      time: new Date("2023-01-04T00:00:00Z").getTime(),
      name: "Pull 4",
      rarity: "SSR",
      isSorted: false,
    },
  ]

  test("should merge when there are no pulls at all", () => {
    const result = mergeRecords({ oldRecords: [], newRecords: [] })
    expect(result).toEqual([])
  })

  test("should merge when there are no old pulls", () => {
    const result = mergeRecords({ oldRecords: [], newRecords })
    expect(result).toEqual(newRecords.map(p => ({ ...p, isSorted: true })))
  })

  test("should return old pulls when there are no new pulls", () => {
    const result = mergeRecords({ oldRecords, newRecords: oldRecords })
    expect(result).toEqual(oldRecords.map(p => ({ ...p, isSorted: true })))
  })

  test("should merge new pulls with old pulls without duplicates", () => {
    const expectedMergedPulls = [
      ...oldRecords,
      {
        pool_id: 1,
        item: 5,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
        rarity: "SSR",
        isSorted: true,
      },
    ]
    const result = mergeRecords({ oldRecords, newRecords })
    expect(result).toEqual(expectedMergedPulls.map(p => ({ ...p, isSorted: true })))
  })

  test("should handle edge case where new pulls overlap and extend old pulls", () => {
    const overlappingnewRecords = [
      {
        pool_id: 1,
        item: 3,
        time: new Date("2023-01-03T00:00:00Z").getTime(),
        name: "Pull 3",
        rarity: "R",
        isSorted: false,
      },
      {
        pool_id: 1,
        item: 5,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
        rarity: "SSR",
        isSorted: false,
      },
      {
        pool_id: 1,
        item: 6,
        time: new Date("2023-01-05T00:00:00Z").getTime(),
        name: "Pull 5",
        rarity: "NUL",
        isSorted: false,
      },
    ]

    const expectedMergedPulls = [
      ...oldRecords,
      {
        pool_id: 1,
        item: 5,
        time: new Date("2023-01-04T00:00:00Z").getTime(),
        name: "Pull 4",
        rarity: "SSR",
        isSorted: true,
      },
      {
        pool_id: 1,
        item: 6,
        time: new Date("2023-01-05T00:00:00Z").getTime(),
        name: "Pull 5",
        rarity: "NUL",
        isSorted: true,
      },
    ]

    const result = mergeRecords({
      oldRecords,
      newRecords: overlappingnewRecords,
    })
    expect(result).toEqual(expectedMergedPulls.map(p => ({ ...p, isSorted: true })))
  })

  // Error Testing Suite

  describe("error handling", () => {
    test("should throw error if new pulls have older data than the previous pulls", () => {
      const oldRecordsWithLatest = [
        {
          pool_id: 1,
          item: 5,
          time: new Date("2023-01-01T00:00:00Z").getTime(),
          name: "Pull 1",
          rarity: "SSR",
          isSorted: true,
        },
        {
          pool_id: 1,
          item: 4,
          time: new Date("2023-01-02T00:00:00Z").getTime(),
          name: "Pull 2",
          rarity: "SR",
          isSorted: true,
        },
      ]

      const newRecordsWithOlderData = [
        {
          pool_id: 1,
          item: 3,
          time: new Date("2023-01-01T00:00:00Z").getTime(),
          name: "Pull 3",
          rarity: "R",
          isSorted: false,
        },
      ]

      try {
        mergeRecords({
          oldRecords: oldRecordsWithLatest,
          newRecords: newRecordsWithOlderData,
        })
      } catch (error) {
        expect((error as Error).message).toContain("Records are out of order!")
      }
    })

    test('should throw error if new pulls are "in between" the old pull range', () => {
      const oldRecordsRange = [
        {
          pool_id: 1,
          item: 5,
          time: new Date("2023-01-01T00:00:00Z").getTime(),
          name: "Pull 1",
          rarity: "SSR",
          isSorted: true,
        },
        {
          pool_id: 1,
          item: 4,
          time: new Date("2023-01-02T00:00:00Z").getTime(),
          name: "Pull 2",
          rarity: "SR",
          isSorted: true,
        },
        {
          pool_id: 1,
          item: 3,
          time: new Date("2023-01-03T00:00:00Z").getTime(),
          name: "Pull 3",
          rarity: "R",
          isSorted: true,
        },
      ]

      const newRecordsInBetween = [
        {
          pool_id: 1,
          item: 4,
          time: new Date("2023-01-02T00:00:00Z").getTime(),
          name: "Pull 2",
          rarity: "SR",
          isSorted: false,
        },
        {
          pool_id: 1,
          item: 3,
          time: new Date("2023-01-02T00:00:00Z").getTime(),
          name: "Pull 3",
          rarity: "R",
          isSorted: false,
        },
      ]

      try {
        mergeRecords({
          oldRecords: oldRecordsRange,
          newRecords: newRecordsInBetween,
        })
      } catch (error) {
        expect((error as Error).message).toContain(
          "Error merging records: It's impossible to append new records 'in between' old records. Aborting.",
        )
      }
    })
  })
})
