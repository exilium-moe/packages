import axios from "axios"
import type { ServerEnum } from "@exilium-moe/shared/types/ServerEnum"
import { servers } from "@exilium-moe/shared/data/servers"
import type { GachaRecordResponse } from "../types/GachaRecordResponse"
import type { GachaPageDTO } from "../types/GachaPage.dto"

export const gachaRecordService = (server: ServerEnum) => {
  const BASE_URL =
    {
      dw: servers.DW_GACHA_RECORD_URL,
      ha: servers.HA_GACHA_RECORD_URL,
      hi: servers.HI_GACHA_RECORD_URL,
      hj: servers.HJ_GACHA_RECORD_URL,
      hk: servers.HK_GACHA_RECORD_URL,
      cn: servers.CN_GACHA_RECORD_URL,
    }[server] || servers.DW_GACHA_RECORD_URL

  /**
   * Fetches a user's gacha records by card pool type, returns paginated response
   *
   * @param type_id - The type of the card pool
   * @param u - User ID
   * @param token - Authentication token
   * @param next - The next page param for pagination (can be null to start fresh)
   * @param maxPages - Limit to the number of pages to fetch
   * @param currentPage - Used for recursion depth
   * @returns GachaPage with records and next pagination token
   */
  const fetchUserGachaRecordsByCardPoolType = async (
    type_id: number,
    u: number,
    token: string,
    next: string | null = null, // Updated to accept `null` to start fresh
    maxPages: number = Number.POSITIVE_INFINITY,
    currentPage = 0,
  ): Promise<GachaPageDTO> => {
    try {
      // Stop recursion if the maximum number of pages has been reached
      if (next !== null && currentPage >= maxPages) {
        return { records: [], next }
      }

      const headers = {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Unity-Version": "2019.4.40f1",
        "User-Agent": "UnityPlayer/2019.4.40f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)",
      }

      const params = new URLSearchParams()
      params.append("type_id", type_id.toString())
      params.append("u", u.toString())

      // If next is not null, add it to the params
      if (next !== null) {
        params.append("next", next)
      }

      const response = await axios.post<GachaRecordResponse>(`${BASE_URL}`, params, {
        headers,
      })

      const records = response.data.data.list
      const nextPage = response.data.data.next || "" // Get the next pagination cursor

      // If there's a 'next' field and the maximum pages have not been reached, fetch the next page
      if (nextPage !== "" && nextPage !== null) {
        const nextRecords = await fetchUserGachaRecordsByCardPoolType(
          type_id,
          u,
          token,
          nextPage, // Recursively fetch the next page
          maxPages,
          currentPage + 1,
        )
        // Merge the current records with the next ones
        return {
          records: [...records, ...nextRecords.records],
          next: nextRecords.next,
        }
      }

      // If no more pages, return the records and next as empty string
      return {
        records,
        next: "", // No more pages left
      }
    } catch (error) {
      throw error
    }
  }

  return { fetchUserGachaRecordsByCardPoolType }
}
