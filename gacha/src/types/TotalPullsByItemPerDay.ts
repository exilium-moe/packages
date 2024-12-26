import { z } from 'zod';

export const TotalPullsByItemPerDaySchema = z.array(
  z.object({
    day: z.string().min(4),
    item: z.coerce.number().gte(1),
    count: z.coerce.number().gte(0),
  })
);

export type TotalPullsByItemPerDay = z.infer<
  typeof TotalPullsByItemPerDaySchema
>;
