import { z } from "zod"
import { GachaRecordSchema } from "./GachaRecord"

export const GachaRecordResponseSchema = z.object({
  code: z.union([z.literal(0), z.literal(-1)]),
  message: z.string(),
  data: z.object({
    list: z.array(GachaRecordSchema),
    next: z.string(),
  }),
})

export type GachaRecordResponse = z.infer<typeof GachaRecordResponseSchema>
