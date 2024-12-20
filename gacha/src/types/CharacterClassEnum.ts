import { z } from "zod"

export const CharacterClassEnumSchema = z.enum(["Bulwark", "Sentinel", "Support", "Vanguard"])

export type CharacterClassEnum = z.infer<typeof CharacterClassEnumSchema>
