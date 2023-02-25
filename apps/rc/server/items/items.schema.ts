import { z } from 'zod'

export const createItemSchema = z
  .object({
    name: z
      .string()
      .trim()
      .transform((val: string) => val.toLowerCase().replace(/\s/g, '_')),
    label: z.string(),
    weight: z.number().default(1),
    type: z.string().default('normal'),
    props: z.string().default('prop_cs_cardbox_01'),
    _unique: z.boolean().default(false),
    maxInSlot: z.number().default(100),
    data: z.record(z.unknown()).default({}),
  })
  .strict()

export type CreateItemType = z.infer<typeof createItemSchema>
