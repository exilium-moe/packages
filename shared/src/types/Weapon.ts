import { z } from "zod";
import { RarityEnumSchema } from "./RarityEnum";
import { WeaponTypeEnumSchema } from "./WeaponTypeEnum";

export const WeaponSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  type: z.optional(WeaponTypeEnumSchema),
  rarity: RarityEnumSchema,
  img: z.object({
    whole: z.string(),
  }),
});

export type Weapon = z.infer<typeof WeaponSchema>;
