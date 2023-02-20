import { TimelineRow } from '@nx/types'
import { useTimelineStore } from '../../store/timeline'
import { TimelineItem } from './components/TimelineItem'

const Timeline = () => {
  const { timeline } = useTimelineStore()

  return (
    <div className="timeline__container">
      {timeline.rows.map((timeline: TimelineRow) => (
        <TimelineItem timeline={timeline} key={timeline.id} />
      ))}
    </div>
  )
}

export { Timeline }
