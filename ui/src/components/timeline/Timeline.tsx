import { TimelineRowT } from '../../../../types/timeline'
import TimelineItem from './components/TimelineItem'
import { useSelector } from 'react-redux'

const Timeline = () => {
  const timelineState = useSelector((state: any) => state.timeline.timeline)

  return (
    <div className="timeline-container">
      {timelineState.rows.map((timeline: TimelineRowT) => (
        <TimelineItem timeline={timeline} key={timeline.id} />
      ))}
    </div>
  )
}

export default Timeline
