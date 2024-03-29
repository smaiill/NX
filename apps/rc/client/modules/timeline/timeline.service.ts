import { ExportMethod, ExportService } from '@decorators/Export'
import { EventsService } from '@modules/events/events.service'
import {
  NuiAPPS,
  TimelineData,
  TimelineEvents,
  TimelineState,
  TimelineUpdateActions,
  UpdateTimelineData,
} from '@nx/types'
import { LG } from '@utils/logger'
import {
  createTimelineSchema,
  CreateTimelineType,
  UpdateTimelineType,
} from './timeline.schema'

@ExportService('Timeline')
class _TimelineService {
  timelineState: TimelineState
  lastTaskID: string
  constructor() {
    this.timelineState = {
      active: false,
      completedTasks: [],
      rows: [],
    }
    this.lastTaskID = ''
  }

  private setState(state: keyof TimelineState, value: any) {
    this.timelineState[state] = value
  }

  private findTaskById(id: string) {
    const task = this.timelineState.completedTasks.find(
      (task) => task.id === id,
    )

    return task
  }

  private findTaskByIndex(index: number) {
    const task = this.timelineState.completedTasks.find(
      (task) => task.index === index,
    )

    return task
  }

  private isPreviusTaskCompleted(index: number) {
    if (index === 1) return true
    const previusTask = this.findTaskByIndex(index - 1)

    return previusTask?.completed ?? false
  }

  private isNextTaskCompleted(index: number) {
    if (index === this.findTaskById(this?.lastTaskID)?.index) return false
    const nextTask = this.findTaskByIndex(index + 1)

    return nextTask?.completed
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

  /**
   * This will create a timeline
   * @param timeline The timeline parametrs
   * @example
   * Create({
   *  rows: [
   *    {
   *      id: '1',
   *      type: 'DOT',
   *      label: 'Kill a player'
   *    }
   *  ]
   * })
   */
  @ExportMethod()
  public create(timeline: CreateTimelineType) {
    const res = createTimelineSchema.safeParse(timeline)

    if (!res.success) {
      LG.error(`Couldn't create Timeline invalid data: ${JSON.stringify(res)}`)
      return
    }

    const { data } = res

    this.setState('active', true)
    this.setState('rows', data.rows)

    for (let i = 1; i <= data.rows.length; i++) {
      this.timelineState.completedTasks.push({
        id: data.rows[i - 1].id,
        completed: data.rows[i].completed,
        index: i,
      })

      this.lastTaskID = data.rows[i - 1].id
    }

    EventsService.emitNuiEvent<TimelineData>({
      app: NuiAPPS.TIMELINE,
      method: TimelineEvents.CREATE_TIMELINE,
      data,
    })
  }

  /**
   * This will update the current timeline
   * @param data The data to update
   * @example
   * Update({
   *  id: '1',
   *  type: 'SET_COMPLETED'
   * })
   */
  @ExportMethod()
  public update(data: UpdateTimelineType) {
    const res = createTimelineSchema.safeParse(data)

    if (!res.success) {
      LG.error(`Couldn't create Timeline invalid data: ${JSON.stringify(res)}`)
      return
    }

    const canUpdate = this.canUpdate(data.type, data.id as string)

    if (!canUpdate) return

    EventsService.emitNuiEvent<UpdateTimelineData>({
      app: NuiAPPS.TIMELINE,
      method: TimelineEvents.UPDATE_TIMELINE,
      data: data,
    })
  }

  /**
   * This will destroy the current active timeline
   * @example
   * Destroy()
   */
  @ExportMethod()
  public destroy() {
    if (!this.isActive()) {
      LG.error('Not active timeline !')
      return
    }

    setTimeout(() => {
      EventsService.emitNuiEvent<void>({
        app: NuiAPPS.TIMELINE,
        method: TimelineEvents.DESTROY_TIMELINE,
      })

      this.setState('active', false)
      this.setState('completedTasks', [])
      this.setState('rows', [])
    }, 1000)
  }

  /**
   * Check if a timeline is active
   * @returns true or false
   * @example
   * IsActive()
   */
  @ExportMethod()
  public isActive(): boolean {
    return this.timelineState.active
  }
}

const TimelineService = new _TimelineService()
export { TimelineService }
