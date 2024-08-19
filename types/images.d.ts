declare module '*.png' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- config file
  const value: import('react-native').ImageURISource
  export = value
}
