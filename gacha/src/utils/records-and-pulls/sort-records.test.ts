import { describe, expect, test } from "vitest";

import { sortRecords } from "./sort-records";

describe("sortRecords", () => {
  test("returns an empty array when input is empty", () => {
    const result = sortRecords([]);
    expect(result).toEqual([]);
  });

  test("returns already sorted records (Oldest -> Newest) unchanged", () => {
    const records = [
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-02T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-03T00:00:00Z"), isSorted: true },
    ];
    const result = sortRecords(records);
    expect(result).toEqual(records);
  });

  test("reverses records when sorted Newest -> Oldest", () => {
    const records = [
      { time: Date.parse("2023-01-03T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-02T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true },
    ];
    const result = sortRecords(records);
    expect(result).toEqual([
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-02T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-03T00:00:00Z"), isSorted: true },
    ]);
  });

  test("marks unsorted records as sorted and sorts them Oldest -> Newest", () => {
    const records = [
      { time: Date.parse("2023-01-03T00:00:00Z") },
      { time: Date.parse("2023-01-02T00:00:00Z") },
      { time: Date.parse("2023-01-01T00:00:00Z") },
    ];
    const result = sortRecords(records);
    expect(result).toEqual([
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-02T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-03T00:00:00Z"), isSorted: true },
    ]);
  });

  test("sorts solo 10-pull records by group when all have groups", () => {
    const records = [
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 2 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 1 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 3 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 5 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 4 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 6 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 7 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 8 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 9 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 10 },
    ];
    const result = sortRecords(records);
    expect(result).toEqual([
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 1 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 2 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 3 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 4 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 5 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 6 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 7 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 8 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 9 },
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true, group: 10 },
    ]);
  });

  test("marks previously unsorted records as sorted when sorted Oldest -> Newest", () => {
    const records = [
      { time: Date.parse("2023-01-01T00:00:00Z") },
      { time: Date.parse("2023-01-02T00:00:00Z") },
      { time: Date.parse("2023-01-03T00:00:00Z") },
    ];
    const result = sortRecords(records);
    expect(result).toEqual([
      { time: Date.parse("2023-01-01T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-02T00:00:00Z"), isSorted: true },
      { time: Date.parse("2023-01-03T00:00:00Z"), isSorted: true },
    ]);
  });
});
