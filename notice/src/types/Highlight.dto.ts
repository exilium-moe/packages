import { z } from "zod"

import { NoticeSchema } from "./Notice"

export const HighlightDTOSchema = NoticeSchema.pick({
  name: true,
  start_time: true,
  end_time: true,
  content: true,
}).extend({
  type: z.literal(3),
})

export type HighlightDTO = z.infer<typeof HighlightDTOSchema>
