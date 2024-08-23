/* eslint-disable -- std config*/
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import AsyncStorage from '@react-native-async-storage/async-storage'
import translationEn from './locales/en.json'
import translationIt from './locales/it.json'

const resources = {
  en: { translation: translationEn },
  it: { translation: translationIt },
} as const

export type Resources = (typeof resources)['en']['translation']

export type LanguageTag = keyof typeof resources

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language')
  if (!savedLanguage) savedLanguage = Localization.getLocales()[0].languageTag

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
