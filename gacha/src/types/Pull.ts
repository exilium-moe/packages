import { z } from "zod"
import { GachaRecordSchema } from "@exilium-moe/gacha/types/GachaRecord"
import { RarityEnumSchema } from "./RarityEnum"

export const PullSchema = GachaRecordSchema.extend({
  name: z.string(),
  rarity: RarityEnumSchema,
})

export type Pull = z.infer<typeof PullSchema>
