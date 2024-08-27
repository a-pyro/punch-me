import type { AxiosError, AxiosRequestConfig } from 'axios'

export type HTTPRequestConfig = AxiosRequestConfig

export type ApiError<T> = AxiosError<T>

export type ApiResponse<T> = {
  data: T
  message?: string
}

export type WithId = {
  id: string
}
