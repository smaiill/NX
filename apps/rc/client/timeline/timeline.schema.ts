import { TimelineUpdateActions } from '@nx/types'
import { z } from 'zod'

const uniqueIDS = (timeline: any) => {
  const rowsIDS = timeline.rows.map((row: any) => row.id)
  const nonDuplicateArray = [...new Set(rowsIDS)]

  if (nonDuplicateArray.length !== rowsIDS.length) {
    return false
  }

  return true
}

export const updateTimelineSchema = z.object({
  type: z.nativeEnum(TimelineUpdateActions),
  id: z.string().trim(),
})

const __ROW = z.object({
  id: z.string(),
  label: z.string().trim(),
  type: z.enum(['DOT', 'OUTLINE']).default('DOT'),
  completed: z.boolean().default(false),
})

export const createTimelineSchema = z
  .object({
    rows: z.array(__ROW),
  })
  .strict()
  .refine(uniqueIDS)

export type CreateTimelineType = z.infer<typeof createTimelineSchema>
export type UpdateTimelineType = z.infer<typeof updateTimelineSchema>
