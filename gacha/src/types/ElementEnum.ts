import { z } from "zod"

export const ElementEnumSchema = z.enum(["Burn", "Corrosion", "Electric", "Freeze", "Hydro", "Turbid", "Ice", ""])

export type ElementEnum = z.infer<typeof ElementEnumSchema>
