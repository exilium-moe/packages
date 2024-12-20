import { z } from "zod"

// Exclusively for Notice.type: 3
export const SkipSchema = z.object({
  jump_type_id: z.number(),
  jump_id: z.number(),
  jump_arg: z.array(z.number()),
  is_pic_jump: z.boolean(),
  is_button_jump: z.boolean(),
})

export type Skip = z.infer<typeof SkipSchema>

export const NoticeSchema = z.object({
  id: z.number(),
  type: z.number(), // 1 - Game Notices, 2 - Events, 3 - Summary Images (No Content)
  name: z.string(), // Title
  start_time: z.number(), // Unix Timestamp, Tz Agnostic
  end_time: z.number(), // Unix Timestamp, Tz Agnostic
  content_type_id: z.number(),
  content: z.string(), // HTML
  head_pic: z.string().optional(), // Long Banner Image
  pic_name: z.string(),
  skip: SkipSchema.optional(),
})

export type Notice = z.infer<typeof NoticeSchema>
