import en from './en'

export const translations = {
  en,
} as const

export type ITranslations = keyof typeof translations
