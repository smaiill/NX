import { defaultOptions } from './consts/defaultOptions'
import { IKeys } from './consts/keys'
import { ITranslations, translations } from './translations'

export interface IOptions {
  /**
   * If it should return `english` if not translation exists in your language
   */
  defaultIfNotExists?: boolean

  /**
   * Your language
   */
  language?: ITranslations
}

export type TArgument = Record<string, any>

export type IOverridedOptions = Required<IOptions>

class _Translations {
  private options: IOptions
  private readonly REGEX: RegExp
  constructor() {
    this.options = {}
    this.REGEX = new RegExp('{{\\s*(\\w+)\\s*}}', 'g')
  }

  public init(options: IOptions = {}) {
    const newOptions = this.overrideOptions(options)

    this.options = newOptions
  }

  private overrideOptions(options: IOptions) {
    const newOptions = Object.assign(defaultOptions, options)

    return newOptions
  }

  public t(key: IKeys, _arguments?: TArgument) {
    if (!this.options.language) {
      throw new Error('Invalid language, you need to init first.')
    }

    const value = this.findValue(key as IKeys)

    const valueWithArgs = this.assignParams(value, _arguments)

    return valueWithArgs
  }

  public findValue(key: IKeys) {
    const defaultIfNotExists = this.options.defaultIfNotExists

    let res = ''

    const value = translations[this.options.language as ITranslations][key]

    res = value

    if (!res && defaultIfNotExists) {
      const value = translations['en'][key]

      if (!value) {
        return ''
      }

      return value
    }

    return res
  }

  public assignParams(value: string, _arguments?: TArgument) {
    if (
      value.length === 0 ||
      !_arguments ||
      Object.getOwnPropertyNames(_arguments).length === 0
    )
      return value

    const _new = value.replace(this.REGEX, (_, key) => _arguments[key])

    return _new
  }
}

const Translations = new _Translations()

const t = Translations.t.bind(Translations)

export { t, Translations }
