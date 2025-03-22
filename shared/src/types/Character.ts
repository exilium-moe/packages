import { z } from "zod";
import { CharacterClassEnumSchema } from "./CharacterClassEnum";
import { WeaponTypeEnumSchema } from "./WeaponTypeEnum";
import { ElementEnumSchema } from "./ElementEnum";
import { RarityEnumSchema } from "./RarityEnum";

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  class: CharacterClassEnumSchema,
  weapon: WeaponTypeEnumSchema,
  element: ElementEnumSchema,
  rarity: RarityEnumSchema,
});

export type Character = z.infer<typeof CharacterSchema>;
