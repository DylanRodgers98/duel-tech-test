import { randomUUID } from "crypto";
import { z } from "zod/v4";

const safeId = z
  .string()
  .nullable()
  .transform((id) => id ?? randomUUID());

const safeNumber = z.any().transform((num: number | string | null): number => {
  if (num === null) {
    return 0;
  }
  const normalized = Number(num);
  if (Number.isNaN(normalized)) {
    return 0;
  }
  return normalized;
});

const completedTaskSchema = z.object({
  task_id: safeId,
  platform: z.enum(["Facebook", "Instagram", "TikTok"]),
  post_url: z.url(),
  likes: safeNumber,
  comments: safeNumber,
  shares: safeNumber,
  reach: safeNumber,
});

export const advocateSchema = z.object({
  user_id: safeId,
  name: z.string(),
  email: z.email(),
  instagram_handle: z.string().nullable(),
  tiktok_handle: z.string().nullable(),
  joined_at: z.coerce.date(),
  advocacy_programs: z.array(
    z.object({
      total_sales_attributed: safeNumber,
      tasks_completed: z.array(completedTaskSchema),
    })
  ),
});

export type Advocate = z.infer<typeof advocateSchema>;
export type CompletedTask = z.infer<typeof completedTaskSchema>;
