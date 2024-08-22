import type Resources from '.'

declare module 'i18next' {
  type CustomTypeOptions = {
    defaultNS: 'ns1'
    resources: Resources
  }
}
