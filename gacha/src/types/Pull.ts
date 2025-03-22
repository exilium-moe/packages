import { z } from "zod";
import { GachaRecordSchema } from "@exilium-moe/gacha/types/GachaRecord";
import { RarityEnumSchema } from "@exilium-moe/shared/types/RarityEnum";
import { CardPoolTypeEnumSchema } from "./CardPoolTypeEnum";

const MAX_MULTI_PULL = 10;

export const PullSchema = GachaRecordSchema.extend({
  group: z.number().gte(1).lte(MAX_MULTI_PULL),
  name: z.string(),
  rarity: RarityEnumSchema,
  cardPoolType: CardPoolTypeEnumSchema,
});

export type Pull = z.infer<typeof PullSchema>;
