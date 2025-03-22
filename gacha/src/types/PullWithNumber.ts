import { z } from "zod";
import { PullSchema } from "./Pull";

export const MAX_PITY_4 = 10;
export const MAX_PITY_5 = 80;

export const PullWithNumberSchema = PullSchema.extend({
  p4: z.number().gte(1).lte(MAX_PITY_4),
  p5: z.number().gte(1).lte(MAX_PITY_5),
});

export type PullWithNumber = z.infer<typeof PullWithNumberSchema>;
