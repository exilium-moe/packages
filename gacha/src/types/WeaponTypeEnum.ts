import { z } from "zod"

export const WeaponTypeEnumSchema = z.enum(["AR", "HG", "LMG", "SG", "SMG", "SR", "RF", "BLD", "MG"])

export type WeaponTypeEnum = z.infer<typeof WeaponTypeEnumSchema>
