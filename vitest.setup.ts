import { Quasar } from 'quasar'
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

config.global.plugins = [Quasar]

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
  }),
}))
