import type { AxiosError, AxiosRequestConfig } from 'axios'

export type HTTPRequestConfig = AxiosRequestConfig

export type ApiError<T> = AxiosError<T>
