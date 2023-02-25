import { z } from 'zod'

export const createBanSchema = z
  .object({
    target: z.number(),
    duration: z.number().default(0),
    reason: z.string().trim().default('no reason.'),
  })
  .strict()

export type CreateBanType = z.infer<typeof createBanSchema>
