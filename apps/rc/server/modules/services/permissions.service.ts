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

  @ExportMethod()
  public doesGroupHasFlag({
    group,
    flag,
  }: {
    group: string
    flag: keyof typeof PermissionsFlags
  }) {
    const _group = this.getGroup(group)

    const flagType = flag.split('_')[0]

    const hasTheFlag = _group?.flags.includes(PermissionsFlags[flag])

    const hasMaximumPermissions = _group?.flags.includes(
      PermissionsFlags[`${flagType}_ALL` as keyof typeof PermissionsFlags],
    )

    return hasTheFlag || hasMaximumPermissions
  }

  @ExportMethod()
  public doesGroupHasAllFlags({
    group,
    flags,
  }: {
    group: string
    flags: Array<keyof typeof PermissionsFlags>
  }) {
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
   * Hello world from there
   * There too !
   * @param srcGroup  The first source group
   * @param targetGroup The second group
   * @returns Returns a boolean
   */
  @ExportMethod()
  public hasMorePermissions(srcGroup: string, targetGroup: string) {
    const srcGroupPower = this.getGroupValueByKey(srcGroup, 'power') ?? 0
    const targetGroupPower = this.getGroupValueByKey(targetGroup, 'power') ?? 0

    return srcGroupPower > targetGroupPower
  }
}

const PermissionsService = new _PermissionsService()
export { PermissionsService }
