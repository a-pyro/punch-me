import { type ClassValue, clsx } from 'clsx'
import { type ClassNameValue, twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export type WitchClassValue = {
  classValue?: ClassNameValue
}
