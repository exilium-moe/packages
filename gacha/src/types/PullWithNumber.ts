import { z } from "zod"
import { PullSchema } from "./Pull"

export const PullWithNumberSchema = PullSchema.extend({
  num: z.number().gte(1),
  p4: z.number().gte(1).lte(10),
  p5: z.number().gte(1).lte(80),
})

export type PullWithNumber = z.infer<typeof PullWithNumberSchema>
