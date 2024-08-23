import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export type WithClassValue = {
  classValue?: ClassValue
}

export type WithInnerClassValue = {
  innerClassValue?: ClassValue
}

export type WithouterClassValueValue = {
  outerClassValue?: ClassValue
}
