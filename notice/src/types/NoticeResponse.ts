import { z } from "zod"

import { NoticeSchema } from "./Notice"

export const NoticeResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    first: z.number(),
    first_type: z.number(),
    list: z.array(NoticeSchema),
    total: z.number(),
    version: z.number(),
  }),
})

export type NoticeResponse = z.infer<typeof NoticeResponseSchema>
