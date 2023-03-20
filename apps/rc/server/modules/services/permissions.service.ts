import { ExportMethod, ExportService } from '@decorators/Export'
import { IGroup, PermissionsFlags } from '@nx/types'
import { config } from '@shared/load.file'

@ExportService('Permissions')
class _PermissionsService {
  private __permissions: IGroup[]
  constructor() {
    this.__permissions = config.permissions
  }

  private getGroup(group: string) {
    const _group = this.__permissions.find((_g) => _g.value === group)

    return _group
  }

  /**
   * Checks if a group has the specified permission flag.
   * @param group The name of the group to check.
   * @param flag The permission flag to check.
   * @returns True if the group has the specified permission flag, false otherwise.
   * @example
   * DoesGroupHasFlag('owner', 'PLAYER_BAN')
   */
  @ExportMethod()
  public doesGroupHasFlag(group: string, flag: keyof typeof PermissionsFlags) {
    const _group = this.getGroup(group)

    const flagType = flag.split('_')[0]

    const hasTheFlag = _group?.flags.includes(PermissionsFlags[flag])

    const hasMaximumPermissions = _group?.flags.includes(
      PermissionsFlags[`${flagType}_ALL` as keyof typeof PermissionsFlags],
    )

    return hasTheFlag || hasMaximumPermissions
  }

  /**
   * Checks if a group has all the specified permission flags.
   * @param group The name of the group to check.
   * @param flags The permission flags to check.
   * @returns True if the group has all the specified permission flags, false otherwise.
   * @example
   * DoesGroupHasAllFlags('owner', ['PLAYER_BAN', 'VEHICLE_CREATE'])
   */
  @ExportMethod()
  public doesGroupHasAllFlags(
    group: string,
    flags: Array<keyof typeof PermissionsFlags>,
  ): boolean {
    const _group = this.getGroup(group)

    const hasAllFlags = flags.every((_flag) => {
      const flagType = _flag.split('_')[0]
      const flag = PermissionsFlags[_flag]
      const allFlag =
        PermissionsFlags[`${flagType}_ALL` as keyof typeof PermissionsFlags]

      const foundFlag = _group?.flags.includes(flag) ? _flag : ''
      const foundAllFlag = _group?.flags.includes(allFlag)
        ? `${flagType}_ALL`
        : ''

      const found = foundFlag || foundAllFlag

      if (!found) return false

      return true
    })

    return hasAllFlags
  }

  public getGroupValueByKey(group: string, key: keyof IGroup) {
    return this.getGroup(group)?.[key]
  }

  /**
   * Check if a group has more permissions then another
   * @param srcGroup The group to check if he has more permissions
   * @param targetGroup The second group
   * @returns a boolean value
   *
   * @example
   * // returns true
   * hasMorePower('owner', 'admin');
   */
  @ExportMethod()
  public hasMorePower(srcGroup: string, targetGroup: string): boolean {
    const srcGroupPower = this.getGroupValueByKey(srcGroup, 'power') ?? 0
    const targetGroupPower = this.getGroupValueByKey(targetGroup, 'power') ?? 0

    return srcGroupPower > targetGroupPower
  }
}

const PermissionsService = new _PermissionsService()
export { PermissionsService }
