import { On } from '@decorators/Event'
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

export class TimelineController {
  @On(TimelineEvents.CREATE_TIMELINE)
  public handleCreateTimeline(timeline: CreateTimelineType) {
    TimelineService.create(timeline)
  }

  @On(TimelineEvents.UPDATE_TIMELINE)
  public handleUpdateTimeline(timeline: UpdateTimelineType) {
    TimelineService.update(timeline)
  }

  @On(TimelineEvents.DESTROY_TIMELINE)
  public handleDestroyTimeline() {
    TimelineService.destroy()
  }
}
