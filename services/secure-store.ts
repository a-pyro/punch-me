import * as SecureStore from 'expo-secure-store'

/* https://docs.expo.dev/versions/latest/sdk/securestore/ */

export type SecureStoreKey = 'accessToken'

export const writeToStore = async (key: SecureStoreKey, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const readFromStore = async (key: SecureStoreKey) => {
  const result = await SecureStore.getItemAsync(key)
  if (!result) return null
  return result
}
