import { z } from "zod"
import { ServerEnumSchema } from "./ServerEnum"

export const UserDataSchema = z.object({
  uid: z.number().min(1),
  token: z.string().min(10),
  server: ServerEnumSchema,
})

export type UserData = z.infer<typeof UserDataSchema>
