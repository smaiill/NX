import { TimelineEventsE } from '../../types/events'
import { NuiAPP } from '../../types/main'
import {
  TimelineDataT,
  TimelineState,
  TimelineUpdateActions,
  UpdateTimelineData,
} from '../../types/timeline'
import TimelineUtils from './timeline.utils'
import EventsService from 'c@events/events.service'
import logger from 'c@utils/logger'

class _TimelineService {
  timelineState: TimelineState
  timelineUtils: typeof TimelineUtils
  lastTaskID: string
  constructor() {
    ;(this.timelineState = {
      active: false,
      completedTasks: [],
      rows: [],
    }),
      (this.timelineUtils = TimelineUtils)
    this.lastTaskID = ''
  }

  private setState(state: keyof TimelineState, value: any) {
    this.timelineState[state] = value
  }

  private findTaskById(id: string) {
    const task = this.timelineState.completedTasks.find(
      (task) => task.id === id
    )

    return task
  }

  private findTaskByIndex(index: number) {
    const task = this.timelineState.completedTasks.find(
      (task) => task.index === index
    )

    return task
  }

  private isPreviusTaskCompleted(index: number) {
    if (index === 1) return true
    const previusTask = this.findTaskByIndex(index - 1)

    return previusTask.completed
  }

  private isNextTaskCompleted(index: number) {
    if (index === this.findTaskById(this.lastTaskID).index) return false
    const nextTask = this.findTaskByIndex(index + 1)

    return nextTask.completed
  }

  private canUpdate(type: keyof typeof TimelineUpdateActions, id: string) {
    if (type === TimelineUpdateActions.SET_COMPLETED) {
      const task = this.findTaskById(id)
      if (!task) {
        return false
      }
      const isPreviusTaskCompleted = this.isPreviusTaskCompleted(task.index)

      if (!isPreviusTaskCompleted) return false

      this.timelineState.completedTasks[task.index - 1].completed = true

      if (this.lastTaskID === task.id) {
        this.destroy()
      }

      return true
    }

    if (type === TimelineUpdateActions.SET_UNCOMPLETED) {
      const task = this.findTaskById(id)

      if (!task || !task.completed) return false

      const isNextCompleted = this.isNextTaskCompleted(task.index)

      if (isNextCompleted) return false

      return true
    }

    return false
  }

  public create(timeline: TimelineDataT) {
    if (this.isActive()) {
      logger.error(`Timeline already active !`)
      return
    }

    const { isValid, errorMessage } =
      this.timelineUtils.validateCreationData(timeline)

    if (!isValid) {
      logger.error(`Couldn't create Timeline: ${errorMessage}`)
      return
    }

    this.setState('active', true)
    this.setState('rows', timeline.rows)

    for (let i = 1; i <= timeline.rows.length; i++) {
      this.timelineState.completedTasks.push({
        id: timeline.rows[i - 1].id,
        completed: false,
        index: i,
      })

      this.lastTaskID = timeline.rows[i - 1].id
    }

    EventsService.emitNuiEvent({
      app: NuiAPP.TIMELINE,
      method: TimelineEventsE.CREATE_TIMELINE,
      data: timeline,
    })
  }

  public update(data: UpdateTimelineData) {
    const canUpdate = this.canUpdate(data.type, data.id)

    if (!canUpdate) return

    EventsService.emitNuiEvent({
      app: NuiAPP.TIMELINE,
      method: TimelineEventsE.UPDATE_TIMELINE,
      data: data,
    })
  }

  public destroy() {
    if (!this.isActive()) {
      logger.error('Not active timeline !')
      return
    }

    setTimeout(() => {
      EventsService.emitNuiEvent({
        app: NuiAPP.TIMELINE,
        method: TimelineEventsE.DESTROY_TIMELINE,
      })

      this.setState('active', false)
      this.setState('completedTasks', [])
      this.setState('rows', [])
    }, 1000)
  }

  public isActive() {
    return this.timelineState.active
  }
}

const TimelineService = new _TimelineService()
export default TimelineService
