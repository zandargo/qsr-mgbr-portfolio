import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const DEFAULT_LOCALE = 'en-US'
const SUPPORTED_LOCALES = ['en-US', 'pt-BR']
const LOCALE_STORAGE_KEY = 'qsr-locale'

const getInitialLocale = () => {
  if (typeof window !== 'undefined') {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      return savedLocale
    }
  }

  if (typeof navigator !== 'undefined') {
    const browserLocale = navigator.language
    if (browserLocale === 'pt-BR') {
      return 'pt-BR'
    }
  }

  return DEFAULT_LOCALE
}

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: DEFAULT_LOCALE,
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
