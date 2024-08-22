/* eslint-disable -- std config*/
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import AsyncStorage from '@react-native-async-storage/async-storage'
import translationEn from './locales/en-US/translation.json'
import translationIt from './locales/it-IT/translation.json'

export const resources = {
  'en-US': { translation: translationEn },
  'it-IT': { translation: translationIt },
}

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

/* 


https://dev.to/lucasferreiralimax/i18n-in-react-native-with-expo-2j0j

*/
