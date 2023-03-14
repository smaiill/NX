import { z } from 'zod'

const __STYLE = z.record(z.string()).default({})

export const createLoadingbarSchema = z.object({
  duration: z.number().default(5),
  label: z.string().optional(),
  style: z.object({
    container: __STYLE,
    label: __STYLE,
    bar: __STYLE,
  }),
})

export type CreationLoadingbarType = z.infer<typeof createLoadingbarSchema>
