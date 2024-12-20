import { z } from "zod"

const CARD_POOLS = {
  Standard: 1,
  Beginner: 5,
  "Featured Character": 3,
  "Featured Weapon": 4,
} as const

export const CardPoolTypeEnumSchema = z.nativeEnum(CARD_POOLS)

export type CardPoolTypeEnum = z.infer<typeof CardPoolTypeEnumSchema>
