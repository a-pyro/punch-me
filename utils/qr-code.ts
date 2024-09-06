import * as Linking from 'expo-linking'

export const createFidelityUrl = ({
  storeId,
  userId,
  action,
}: {
  storeId: string
  userId: string
  action: 'requestPoints'
}) => {
  return Linking.createURL(`store/${storeId}`, {
    queryParams: { userId, action },
  })
}

export const useLinking = () => {
  const url = Linking.useURL()

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url)
    console.log('url', { hostname, path, queryParams })
    return { hostname, path, queryParams }
  }

  return null
}
