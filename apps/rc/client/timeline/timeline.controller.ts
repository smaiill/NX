import { TimelineEvents } from '@nx/types'
import { CreateTimelineType, UpdateTimelineType } from './timeline.schema'
import { TimelineService } from './timeline.service'

on(TimelineEvents.CREATE_TIMELINE, (timeline: CreateTimelineType): void => {
  TimelineService.create(timeline)
})

on(TimelineEvents.UPDATE_TIMELINE, (timeline: UpdateTimelineType): void => {
  TimelineService.update(timeline)
})

on(TimelineEvents.DESTROY_TIMELINE, (): void => {
  TimelineService.destroy()
})
