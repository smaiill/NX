import { TimelineRow } from '@nx/types'

const TimelineItem = ({ timeline }: { timeline: TimelineRow }) => {
  return (
    <div
      id={'timeline__item__' + timeline.id}
      className={`timeline__item__container  ${
        timeline.completed ? 'timeline__item__finished' : ''
      }`}
    >
      <div className={`timeline__item timeline__item__${timeline.type}`}></div>
      <p>{timeline.label}</p>
    </div>
  )
}

export { TimelineItem }
