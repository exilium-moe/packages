import { z } from "zod";

export const RarityEnumSchema = z.number().gte(3).lte(5).or(z.literal(-1));

export type RarityEnum = z.infer<typeof RarityEnumSchema>;
