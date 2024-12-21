import { z } from "zod"
import type { NoticeResponse } from "../types/NoticeResponse"
import type { Notice } from "../types/Notice"
import { type NewsDTO, NewsDTOSchema } from "../types/News.dto"
import { type HighlightDTO, HighlightDTOSchema } from "../types/Highlight.dto"
import type { ServerEnum } from "@exilium-moe/shared/types/ServerEnum"
import { servers } from "@exilium-moe/shared/data/servers"

export const noticeService = (server: ServerEnum) => {
  const BASE_URL =
    {
      dw: servers.DW_NOTICE_URL,
      ha: servers.HA_NOTICE_URL,
      hi: servers.HI_NOTICE_URL,
      hj: servers.HJ_NOTICE_URL,
      hk: servers.HK_NOTICE_URL,
      cn: servers.CN_NOTICE_URL,
    }[server] || servers.DW_NOTICE_URL

  const _fetchNotices = async (): Promise<Notice[]> => {
    try {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Unity-Version": "2019.4.40f1",
        "User-Agent": "UnityPlayer/2019.4.40f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)",
      }

      const params = new URLSearchParams()
      params.append("game_channel_id", "10001")
      params.append("type_id", "3")

      const url = `${BASE_URL}?${params.toString()}`

      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      let data: NoticeResponse

      try {
        data = await response.json()
      } catch (jsonError) {
        throw jsonError
      }

      if (!response.ok) {
        // API returned an error, but with a valid JSON response
        throw new Error(`API error: ${data.msg || "Unknown error"}. HTTP status: ${response.status}`)
      }

      return data.data.list
    } catch (error) {
      throw error
    }
  }

  const fetchNews = async (): Promise<NewsDTO[]> => {
    const notices = await _fetchNotices()

    const news = z.array(NewsDTOSchema).parse(notices.filter(n => n.type === 2))

    return news
  }

  const fetchHighlights = async (): Promise<HighlightDTO[]> => {
    const notices = await _fetchNotices()

    const highlights = z.array(HighlightDTOSchema).parse(notices.filter(n => n.type === 3))

    return highlights
  }

  return { fetchNews, fetchHighlights }
}
