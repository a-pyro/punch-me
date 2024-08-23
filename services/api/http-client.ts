import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { Alert } from 'react-native'

import { readFromStore } from '../secure-store'

import { type HTTPRequestConfig } from './types'
// TODO HANDLE ERRORS
export const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<{ message: string }>) => {
    Alert.alert(
      `Error ${error.response?.status}: ${error.response?.data.message}`,
    )
    return Promise.reject(error)
  },
)

axiosClient.interceptors.request.use(async (config) => {
  const token = await readFromStore('accessToken')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

async function tryAction<T>(
  action: () => Promise<AxiosResponse<T>>,
  endpoint: string,
) {
  try {
    return await action()
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a logging statement
    console.error('🚀 ~  tryAction ~ error:', error, `endpoint: ${endpoint}`)
    throw error
  }
}

const get = async <T>(endpoint: string, config: HTTPRequestConfig = {}) => {
  return await tryAction(() => axiosClient.get<T>(endpoint, config), endpoint)
}

const create = async <TResponse, TRequest>(
  endpoint: string,
  data?: TRequest,
  config: HTTPRequestConfig = {},
) => {
  return await tryAction(
    () => axiosClient.post<TResponse>(endpoint, data, config),
    endpoint,
  )
}

const update = async <TResponse, TRequest>(
  endpoint: string,
  data?: TRequest,
  config: HTTPRequestConfig = {},
) => {
  return await tryAction(
    () => axiosClient.put<TResponse>(endpoint, data, config),
    endpoint,
  )
}

export const httpClient = {
  get,
  create,
  update,
}
