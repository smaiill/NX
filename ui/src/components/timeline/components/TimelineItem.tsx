import { TimelineDataT, TimelineRowT } from '../../../types/timeline'
import React from 'react'

const TimelineItem = ({ timeline }: { timeline: TimelineRowT }) => {
  return (
    <div
      id={'timeline-item-' + timeline.id}
      className={`timeline-item ${
        timeline.completed ? 'timeline-item-finished' : ''
      }`}
    ></div>
  )
}

export default TimelineItem
