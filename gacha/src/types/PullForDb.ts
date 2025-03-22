import { z } from "zod";
import { PullWithNumberSchema } from "./PullWithNumber";
import { ServerEnumSchema } from "@exilium-moe/shared/types/ServerEnum";
import { unixToIsoString } from "../utils/unix-to-iso-string";

// Custom Zod validation for the 'time' field to ensure it's a valid Unix timestamp
const IsoStringValidator = z.string().refine(
  (val) => {
    const parsed = Number.parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return true;
    }
    return false;
  },
  {
    message: "Invalid Unix timestamp, should be a valid Unix timestamp string",
  }
);

export const PullForDbSchema = PullWithNumberSchema.extend({
  uid: z.number().gte(1),
  server: ServerEnumSchema,
  isSorted: z.boolean(),
  time: IsoStringValidator.transform((val) =>
    unixToIsoString(Number.parseInt(val, 10))
  ), // ISO 8601 String
});

export type PullForDb = z.infer<typeof PullForDbSchema>;
