import { z } from "zod"
import { PullWithNumberSchema } from "./PullWithNumber"
import { CardPoolTypeEnumSchema } from "./CardPoolTypeEnum"

export const PullsUploadDTOSchema = z.object({
  pulls: z.array(PullWithNumberSchema),
  cardPoolType: CardPoolTypeEnumSchema,
  uid: z.number().gte(1),
})

export type PullsUploadDTO = z.infer<typeof PullsUploadDTOSchema>
