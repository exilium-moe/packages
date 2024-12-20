import { z } from "zod"

import { NoticeSchema } from "./Notice"

export const NewsDTOSchema = NoticeSchema.pick({
  name: true,
  start_time: true,
  end_time: true,
  content: true,
  head_pic: true,
}).extend({
  type: z.literal(2),
})

export type NewsDTO = z.infer<typeof NewsDTOSchema>
