import { TimelineEventsE } from '../../../types/events'
import { TimelineDataT, UpdateTimelineData } from '../../../types/timeline'
import TimelineService from './timeline.service'

on(TimelineEventsE.CREATE_TIMELINE, (timeline: TimelineDataT): void => {
  TimelineService.create(timeline)
})

on(TimelineEventsE.UPDATE_TIMELINE, (timeline: UpdateTimelineData): void => {
  TimelineService.update(timeline)
})

on(TimelineEventsE.DESTROY_TIMELINE, (): void => {
  TimelineService.destroy()
})
