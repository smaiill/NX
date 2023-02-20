import { TimelineData, TimelineEvents, UpdateTimelineData } from '@nx/types'
import { TimelineService } from './timeline.service'

on(TimelineEvents.CREATE_TIMELINE, (timeline: TimelineData): void => {
  TimelineService.create(timeline)
})

on(TimelineEvents.UPDATE_TIMELINE, (timeline: UpdateTimelineData): void => {
  TimelineService.update(timeline)
})

on(TimelineEvents.DESTROY_TIMELINE, (): void => {
  TimelineService.destroy()
})
