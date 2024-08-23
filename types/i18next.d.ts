import { type Resources } from '../i18n'

declare module 'i18next' {
  type CustomTypeOptions = {
    resources: Resources
  }
}
