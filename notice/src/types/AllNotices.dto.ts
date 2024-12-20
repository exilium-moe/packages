import { z } from "zod"

import { NewsDTOSchema } from "./News.dto"
import { HighlightDTOSchema } from "./Highlight.dto"

export const AllNoticesDTOSchema = z.object({
  news: z.array(NewsDTOSchema),
  highlights: z.array(HighlightDTOSchema),
})

export type AllNoticesDTO = z.infer<typeof AllNoticesDTOSchema>
