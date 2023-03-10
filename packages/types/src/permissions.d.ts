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
