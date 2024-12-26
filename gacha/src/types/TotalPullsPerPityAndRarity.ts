import { z } from 'zod';
import { RarityEnumSchema } from '@exilium-moe/gacha/types/RarityEnum';

export const TotalPullsPerPityAndRaritySchema = z.array(
  z.union([
    z.object({
      rarity: z.literal(RarityEnumSchema.Values.SR),
      pity: z.number().gte(0),
      count: z.coerce.number().gte(0),
    }),
    z.object({
      rarity: z.literal(RarityEnumSchema.Values.SSR),
      pity: z.number().gte(0),
      count: z.coerce.number().gte(0),
    }),
  ])
);

export type TotalPullsPerPityAndRarity = z.infer<
  typeof TotalPullsPerPityAndRaritySchema
>;
