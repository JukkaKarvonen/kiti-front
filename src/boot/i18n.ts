import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import { Lang } from 'quasar'

import messages from 'src/i18n'

export type MessageLanguages = keyof typeof messages
// Type-define 'en' as the master schema for the resource
export type MessageSchema = (typeof messages)['en']

import langEn from 'quasar/lang/en-GB'
import langFi from 'quasar/lang/fi'

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default defineBoot(({ app }) => {
  const getDefaultLanguage = (): MessageLanguages => {
    const storedLanguage = localStorage.getItem('language') as MessageLanguages
    if (storedLanguage && messages[storedLanguage]) {
      return storedLanguage
    }

    const browserLanguage = navigator.language.split('-')[0] as MessageLanguages
    if (messages[browserLanguage]) {
      return browserLanguage
    }

    return 'en'
  }

  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: getDefaultLanguage(),
    legacy: false,
    fallbackLocale: 'en',
    messages,
  })

  // Set i18n instance on app
  app.use(i18n)

  app.config.globalProperties.$setLanguage = (language: MessageLanguages) => {
    if (messages[language]) {
      i18n.global.locale = language
      localStorage.setItem('language', language)
      Lang.set(language === 'fi' ? langFi : langEn)
    }
  }
})
