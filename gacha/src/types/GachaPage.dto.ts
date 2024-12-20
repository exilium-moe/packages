import { z } from "zod"
import { GachaRecordSchema } from "./GachaRecord"

export const GachaPageDTOSchema = z.object({
  records: z.array(GachaRecordSchema),
  next: z.string(),
})

export type GachaPageDTO = z.infer<typeof GachaPageDTOSchema>
