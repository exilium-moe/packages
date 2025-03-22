import { z } from "zod";

export const RarityEnumSchema = z.enum(["R", "SR", "SSR", "NUL"]);

export type RarityEnum = z.infer<typeof RarityEnumSchema>;
