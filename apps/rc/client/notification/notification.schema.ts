import { z } from 'zod'

const __BODY = z
  .object({
    content: z.string(),
  })
  .required()

export const createNotificationSchema = z.object({
  type: z.enum(['SUCCES', 'WARN', 'NORMAL', 'ERROR']).default('NORMAL'),
  duration: z.number().default(5),
  body: __BODY,
})

export type CreateNotificationType = z.infer<typeof createNotificationSchema>
