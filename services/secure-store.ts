import * as SecureStore from 'expo-secure-store'

/* https://docs.expo.dev/versions/latest/sdk/securestore/ */

export type SecureStoreKey = 'accessToken' | 'user'

export const writeToStore = async (key: SecureStoreKey, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const deleteFromStore = async (key: SecureStoreKey) => {
  await SecureStore.deleteItemAsync(key)
}

export const readFromStore = async (key: SecureStoreKey) => {
  const result = await SecureStore.getItemAsync(key)
  if (!result) return null
  return result
}

export const expoSecureStore = {
  writeToStore,
  deleteFromStore,
  readFromStore,
}
