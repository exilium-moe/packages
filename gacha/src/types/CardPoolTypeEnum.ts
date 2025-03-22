import { z } from "zod";

export const CARD_POOL_TYPE_MAP = {
  Standard: 1,
  Beginner: 5,
  "Featured Character": 3,
  "Featured Weapon": 4,
} as const;

export const CardPoolTypeEnumSchema = z.nativeEnum(CARD_POOL_TYPE_MAP);

export type CardPoolTypeEnum = z.infer<typeof CardPoolTypeEnumSchema>;
