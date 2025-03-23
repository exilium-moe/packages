import { z } from "zod";
import { PullSchema } from "./Pull";
import { CardPoolTypeEnumSchema } from "./CardPoolTypeEnum";

export const PullsUploadDTOSchema = z.object({
  pulls: z.array(PullSchema),
  cardPoolType: CardPoolTypeEnumSchema,
  uid: z.number().gte(1),
});

export type PullsUploadDTO = z.infer<typeof PullsUploadDTOSchema>;
