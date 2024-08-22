import axios, { type AxiosResponse } from 'axios'

import { readFromStore } from '../secure-store'

import { type HTTPRequestConfig } from './types'

export const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

// axiosClient.interceptors.response.use(
//   (response: AxiosResponse<any>) => {
//     return response
//   },
//   async (error: ApiError) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       await Auth.signOut()
//       window.location.pathname = '/'
//     }

//     return Promise.reject(error)
//   },
// )

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
