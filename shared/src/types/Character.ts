import { z } from "zod";
import { CharacterClassEnumSchema } from "./CharacterClassEnum";
import { WeaponTypeEnumSchema } from "./WeaponTypeEnum";
import { ElementEnumSchema } from "./ElementEnum";
import { RarityEnumSchema } from "./RarityEnum";

export const CharacterSchema = z.object({
  id: z.number(),
  code: z.string(), // helps determine the assets to load, ie. BiyocaSSR
  name: z.string(),
  slug: z.string(),
  class: CharacterClassEnumSchema,
  weapon: WeaponTypeEnumSchema,
  element: ElementEnumSchema,
  rarity: RarityEnumSchema,
  img: z.object({
    icon: z.string(),
    whole: z.string(),
  }),
});

export type Character = z.infer<typeof CharacterSchema>;
