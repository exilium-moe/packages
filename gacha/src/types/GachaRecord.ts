import { z } from "zod"

export const GachaRecordSchema = z.object({
  pool_id: z.number(),
  item: z.number(),
  time: z.number(),
  isSorted: z.boolean().optional(),
})

export type GachaRecord = z.infer<typeof GachaRecordSchema>
