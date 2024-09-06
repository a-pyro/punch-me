export const redirectSystemPath = ({
  path,
  initial,
}: {
  path: string
  initial: boolean
}) => {
  // const url = Linking.useURL()

  // if (url) {
  //   const { hostname, path, queryParams } = Linking.parse(url)
  //   console.log('url', { hostname, path, queryParams })
  // }
  console.log('redirectSystemPath', { path, initial })
  if (!initial) {
    alert('Welcome back')
  }
  return '/(tabs)/stores'
}

// npx uri-scheme open "punch-me.app://caramelle" --android
