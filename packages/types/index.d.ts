interface DBConfiguration {
  host: string
  user: string
  password: string
  database: string
}

interface PlayerConfiguration {
  maxWeight: number
}

interface DiscordConfiguration {
  logs: {
    webhook: string
    logsConfiguration: {
      playerJoin: boolean
      playerDropped: boolean
    }
  }
  richPresence: {
    active: boolean
    appID: string
    image: string
    imageHoverText: string
    buttons: [
      {
        label: string
        href: string
      },
      {
        label: string
        href: string
      },
    ]
    text: string
  }
}

export interface Configuration {
  database: DBConfiguration
  player: PlayerConfiguration

  accounts: {
    [key: string]: number
  }

  discord: DiscordConfiguration
  permissions: IGroup[]
}

export enum DecoratorsTokens {
  __EXPORTED_METHODS = '__exportedMethods',
  __SERVICE_NAME = '__serviceName',
}

export enum PlayerEvents {
  PLAYER_LOADED = 'NX::playerLoaded',
  NEW_PLAYER = 'NX::newPlayer',
  UPDATE_COORDS = 'NX::updateCoords',
  UPDATE_STATUS = 'NX::updateStatus',
  ADD_STATUS = 'NX::addStatus',
  PLAYER_DROPPED = 'NX::playerDropped',
  BAN_PLAYER = 'NX::banPlayer',
  ON_STATUS_UPDATED = 'NX::onStatusUpdated',
  ON_PLAYER_LOADED = 'NX::onPlayerLoaded',
  SEND_MESSAGE_TO_PLAYER = 'NX::sendMessageToPlayer',
  PLAYER_FIRST_CONNECTION = 'NX::playerFirstConnection',

  UPDATE_LOCALE_CACHE_BY_KEY = 'NX::updateLocaleCacheByKey',
  CHARINFO_UPDATED = 'NX::charInfoUpdated',
}

export enum ItemsEvents {
  DROP_ITEM = 'NX::dropItem',
  CREATE_PICKUP = 'NX::createPickup',
  CREATE_MISSING_PICKUPS = 'NX::createMissingPickups',
  PICKUP_ITEM = 'NX::pickupItem',
  REMOVE_PICKUP = 'NX::removePickup',
  HANDLE_PICKUPS = 'NX::handlePickups',
  USE_ITEM = 'NX::useItem',
  CREATE_ITEM = 'NX::createItem',
  ITEM_CREATED = 'NX::itemCreated',
}

export enum MenuEvents {
  CREATE_MENU = 'NX::createMenu',
  KEY_PRESSED = 'KEY_PRESSED',
  HIDE_MENU = 'HIDE_MENU',
  CHECKBOX_CHANGED = 'CHECKBOX_CHANGED',
}

export enum InputEvents {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
  DESTROY_INPUT = 'NX::destroyInput',
}

export enum InventoryEvents {
  UPDATE_INVENTORY = 'NX::updateInventory',
  ON_INVENTORY_UPDATED = 'NX::onInventoryUpdated',
}

export enum TimelineEvents {
  CREATE_TIMELINE = 'NX::createTimeline',
  UPDATE_TIMELINE = 'NX::updateTimeline',
  DESTROY_TIMELINE = 'NX::destroyTimeline',
}

export enum JobsEvents {
  JOB_UPDATED = 'NX::jobUpdated',
}

export enum DBEvents {
  DB_CONNECTED = 'NX::DBConnected',
}

export enum NotificationEvents {
  CREATE_NOTIFICATION = 'NX::createNotification',
}

export enum LoadingBarEvents {
  CREATE_LOADING_BAR = 'NX::createLoadingBar',
}

export interface InputRow {
  label: string
  id: string
  type: 'text' | 'password' | 'color'
  required?: boolean
  options?: Record<string, string | number | boolean>
}

export interface InputsData {
  title: string
  rows: InputRow[]
}

export interface InputSliceState {
  inputData: InputsData | null
  invalidInputs: string[]
}

export interface Pickup {
  name: string
  amount: number
  coords: number[]
  uuid?: string
  label: string
  propsType: string
  object?: number
  itemType: string
  _unique: boolean
  maxInSlot: number
}
export interface Item {
  name: string
  label: string
  weight: number
  type: string
  props: string
  _unique: boolean
  maxInSlot: number
  data: Record<string, unknown>
}

export type SavedItem = Item & { id: number }

export interface UsableItem {
  [property: string]: () => void
}

export interface InventoryItem extends Item {
  amount: number
}

interface JobGrade {
  name: string
  label: string
  salary: number
  skin: {
    male: any
    female: any
  }
}
export interface Job {
  name: string
  label: string
  type: number
  grades: JobGrade[]
}

export interface JobCB {
  job: string
  job_grade: string
  type: number
}

export type SavedJob = Job & { id: number }

export interface LoadingBarStyle {
  container?: Record<string, string>
  label?: Record<string, string>
  bar?: Record<string, string>
}

export interface LoadingBarData {
  duration: number
  label?: string
  style?: LoadingBarStyle
}

export interface LoadingBarState {
  loadingBar: LoadingBarData | null
}

export enum NuiAPPS {
  NOTIFICATION = 'NX::notification',
  LOADING_BAR = 'NX::loadingBar',
  TIMELINE = 'NX::timeline',
  INPUT = 'NX::input',
  MENU = 'NX::menu',
}

export enum InventoryActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface InventoryActionData {
  type: keyof typeof InventoryActions
  name: string
  amount: number
}

export interface Ban {
  license: string
  bannedBy: string
  identifiers: string[]
  reason: string
  id: string
  expire: number
}

export type SavedBan = Ban & { date: Date }

export interface Response<T = any> {
  ok: boolean
  message?: string
  data?: T
}

export interface DiscordWebhook {
  data: unknown
  options: {
    url: string
  }
}

export type ResponseCB<T = any> = ({ ok, message, data }: Response<T>) => void

export interface KeyPressedHandler {
  key: KeysTypes
  index: number
  type: MenuItemTypes
  choiceIndex?: number
}

export enum MenuItemEnum {
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX',
  SEPARATOR = 'SEPARATOR',
}

export type MenuItemTypes = keyof typeof MenuItemEnum

export enum Keys {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  RETURN = 'RETURN',
  BACK = 'BACK',
}

export type KeysTypes = keyof typeof Keys

export interface IListChoice {
  itemID: number
  actualChoice: {
    id: string
    index: number
  }
  maxChoices: number
}
export interface Menu {
  options: MenuOptions
  items: MenuItem[]
  uuid?: string
  active?: boolean
  itemsLength?: number
  listChoices?: IListChoice[]
}

export interface MenuOptions {
  title: string
  banner: string
  width?: number
}

export interface ItemListChoice {
  label: string
  id: string
}

export interface MenuItemBase {
  label: string
  id: string
  onClick?: (...args: unknown[]) => void
  onChange?: (...args: unknown[]) => void
  selected?: boolean
}

export interface ListMenuItem extends MenuItemBase {
  type: 'LIST'
  choices: ItemListChoice[]
}

export interface ButtonMenuItem extends MenuItemBase {
  type: 'BUTTON'
}

export interface SeparatorMenuItem extends MenuItemBase {
  type: 'SEPARATOR'
}

export interface SliderMenuItem extends MenuItemBase {
  type: 'SLIDER'
  min?: number
  max?: number
}

export interface CheckboxMenuItem extends MenuItemBase {
  type: 'CHECKBOX'
}

export type MenuItem =
  | ButtonMenuItem
  | ListMenuItem
  | SeparatorMenuItem
  | SliderMenuItem
  | CheckboxMenuItem

export interface KeyMapping {
  key: string
  description: string
  command: string
  handler: (key: KeysTypes) => void
}

export enum CodeColors {
  CLOSE = 0,
  DARK_RED = '^1',
  GREEN = '^2',
  ORANGE = '^3',
  BLUE = '^4',
  PURPLE = '^6',
  WHITE = '^7',
  RED = '^9',
}

export interface Icon {
  name: string
  size?: number
  otherClass?: string
}

export interface Defferals {
  defer(): void
  update(message: string): void
  presentCard<T = unknown>(
    card: object | string,
    cb?: (data: T, rawData: string) => void,
  ): void
  done(failureReason?: string): void
  handover(data: { [key: string]: unknown }): void
}

export type NotificationTypes = 'SUCCESS' | 'WARN' | 'NORMAL' | 'ERROR'

export enum NotificationBGColors {
  SUCCESS = 'rgba(11, 135, 45, 0.3)',
  WARN = 'rgba(239, 148, 0, 0.3)',
  NORMAL = 'rgba(0, 108, 228, 0.3)',
  ERROR = 'rgba(236, 78, 43, 0.3)',
}

export enum NotificationMainColors {
  SUCCESS = '#0B872D',
  WARN = '#ef9400',
  NORMAL = '#006ce4',
  ERROR = '#ec4e2b',
}

export enum NotificationColorsReplace {
  CLOSE = 0,
  RED = 1,
  ORANGE = 2,
  YELLOW = 3,
  GREEN = 4,
  CYAN = 5,
  BLUE = 6,
  PURPLE = 7,
}

export interface NotificationData {
  type: NotificationTypes
  duration: number
  body: {
    content: string
  }
}

export type ICreatedNotification = NotificationData & {
  uuid: string
}

export interface NotificationSliceState {
  notifications: ICreatedNotification[]
}

export interface IGroup {
  label: string
  value: string
  power: number
  flags: PermissionsFlags[]
}

export enum PermissionsFlags {
  PLAYER_KICK = 'PLAYER_KICK',
  PLAYER_BAN = 'PLAYER_BAN',
  PLAYER_ALL = 'PLAYER_ALL',

  VEHICLE_CREATE = 'VEHICLE_CREATE',
  VEHICLE_ALL = 'VEHICLE_ALL',
}

export type BloodTypes = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface NXPlayerCharInfo {
  firstname: string
  lastname: string
  dob: string
  nationality: string
  sex: 'female' | 'male'
  hunger: number
  thirst: number
  blood_type: BloodTypes
  [key: string]: any
}

export interface NXPlayerMethods {
  getWeight(): number
  getName(): string
  getCharInfo(): NXPlayerCharInfo
  getIdentifier(): string
  getCoords(): Position
  getInventory(): Record<string, InventoryItem>
  getAccounts(): Record<string, number>
  getGroup(): string
  getBloodType(): string
  getThirst(): number
  getHunger(): number
  getMaxWeight(): number
  getUID(): string
  getAccountMoney(account: string): number | undefined
  getJob(type: number): { name: string; grade: string; label: string }
  getJobs(): Array<{ name: string; grade: string; label: string }>
  setThirst(value: number): void
  setHunger(value: number): void
  setGroup(permission: string): void
  setAccountMoney(account: string, money: number): void
  setJob(
    name: string,
    grade: string,
    type: number,
    cb?: (res: JobCB) => void,
  ): void
  setCoords(x: number, y: number, z: number, heading: number): void
  emitEvent(name: string, ...args: unknown[]): void
  hasItem(name: string): boolean | InventoryItem
  removeItem(name: string, amount: number, cb?: ResponseCB): void
  setCharInfoKey(key: string, value: string): void
  addItem(name: string, amount: number, cb?: ResponseCB): void
  save(cb?: ResponseCB): Promise<void>
  kick(reason: string): void
}

export type NXPlayerMethodsCapitalized = {
  [P in keyof NXPlayerMethods as Capitalize<P>]: NXPlayerMethods[P]
}

export interface Position {
  x: number
  y: number
  z: number
  heading: number
}

export interface NXPlayer extends NXPlayerMethods {
  identifier: string
  charinfo: NXPlayerCharInfo
  inventory: Record<string, InventoryItem>
  accounts: Record<string, number>
  position: Position
  group: string
  weight: number
  name: string
  source: number
  maxWeight: number
  uid: string
  skin: Record<string, number | string>
}

export enum TimelineUpdateActions {
  SET_COMPLETED = 'SET_COMPLETED',
  SET_UNCOMPLETED = 'SET_UNCOMPLETED',
}

export type TimelineRowTypes = 'DOT' | 'OUTLINE'

export interface UpdateTimelineData {
  type: keyof typeof TimelineUpdateActions
  id: string
}

export interface TimelineRow {
  id: string
  label: string
  completed: boolean
  type: TimelineRowTypes
}

export interface TimelineData {
  rows: TimelineRow[]
}

export interface TimelineStateSlice {
  timeline: {
    rows: TimelineRow[]
  }
}

export type CompletedTask = Pick<TimelineRow, 'id' | 'completed'> & {
  index: number
}

export interface TimelineState {
  active: boolean
  rows: TimelineRow[]
  completedTasks: CompletedTask[]
}
