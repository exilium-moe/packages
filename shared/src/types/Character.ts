import { z } from "zod";
import { RarityEnumSchema } from "./RarityEnum";

export const CharacterSchema = z.object({
  id: z.number(),
  code: z.string(), // helps determine the assets to load, ie. BiyocaSSR
  name: z.string(),
  slug: z.string(),
  rarity: RarityEnumSchema,
  img: z.object({
    icon: z.string(),
    whole: z.string(),
  }),
});

export type Character = z.infer<typeof CharacterSchema>;
