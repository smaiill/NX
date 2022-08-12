import { TimelineEventsE } from '../../types/events'
import { TimelineDataT, UpdateTimelineData } from '../../types/timeline'
import TimelineService from './timeline.service'

on(TimelineEventsE.CREATE_TIMELINE, (timeline: TimelineDataT) => {
  TimelineService.create(timeline)
})

on(TimelineEventsE.UPDATE_TIMELINE, (timeline: UpdateTimelineData) => {
  TimelineService.update(timeline)
})
