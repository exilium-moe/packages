import { z } from "zod"
import { RarityEnumSchema } from "@exilium-moe/gacha/types/RarityEnum"

export const TotalPullsPerPityAndRaritySchema = z.array(
  z.union([
    z.object({
      rarity: z.literal(RarityEnumSchema.Values.SR),
      pity: z.number().gte(1).lte(10, { message: "SR pity cannot go beyond 10" }),
      count: z.number().gte(0),
    }),
    z.object({
      rarity: z.literal(RarityEnumSchema.Values.SSR),
      pity: z.number().gte(1).lte(80, { message: "SSR pity cannot go beyond 80" }),
      count: z.number().gte(0),
    }),
  ]),
)

export type TotalPullsPerPityAndRarity = z.infer<typeof TotalPullsPerPityAndRaritySchema>
