import { TimelineRowT } from '../../../types/timeline'

const TimelineItem = ({ timeline }: { timeline: TimelineRowT }) => {
  return (
    <div
      id={'timeline-item-' + timeline.id}
      className={`timeline-item-container  ${
        timeline.completed ? 'timeline-item-finished' : ''
      }`}
    >
      <div className={`timeline-item timeline-item-${timeline.type}`}></div>
      <p>{timeline.label}</p>
    </div>
  )
}

export default TimelineItem
