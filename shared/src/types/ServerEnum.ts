import { z } from "zod"

export const ServerEnumSchema = z.enum(["dw", "ha", "hi", "hk", "hj", "cn"]).default("dw")

export type ServerEnum = z.infer<typeof ServerEnumSchema>
