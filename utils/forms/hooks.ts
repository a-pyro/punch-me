import { zodResolver } from '@hookform/resolvers/zod'
import {
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from 'react-hook-form'
import { type ZodType } from 'zod'

import { type FormOperation } from '@/components/store'

export const useAsyncForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props: UseFormProps<TFieldValues, TContext> & {
    operation: FormOperation
    getAsyncData: (...args: unknown[]) => Promise<TFieldValues> | TFieldValues
    schema: ZodType
  },
): UseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  return useForm<TFieldValues>({
    ...props,
    resolver: zodResolver(props.schema),
    defaultValues:
      props.operation === 'update'
        ? async () => await props.getAsyncData()
        : props.defaultValues,
  }) as UseFormReturn<TFieldValues, TContext, TTransformedValues>
}
