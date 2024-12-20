import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export function unixToIsoString(
  unixTimestamp: number | string, // Accept both number and string inputs
  timezone = "UTC",
) {
  // Check if the input is a valid Unix timestamp (number and greater than 0)
  if (typeof unixTimestamp === "number" && !isNaN(unixTimestamp) && unixTimestamp > 0) {
    return dayjs
      .unix(unixTimestamp) // Convert Unix timestamp to Day.js object
      .tz(timezone, true) // Convert to the given timezone
      .toISOString() // Return ISO string in the specified timezone
  }

  // If it's not a valid Unix timestamp, just return it as a string
  return String(unixTimestamp)
}
