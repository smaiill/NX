import { On } from '@decorators/Event'
import { TimelineEvents } from '@nx/types'
import { CreateTimelineType, UpdateTimelineType } from './timeline.schema'
import { TimelineService } from './timeline.service'

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
