import React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import { type WithClassValue } from '@/utils'

import { ThemedText } from '../common'

import { FormField, type FormFieldProps } from './form-field'

type ControlledFormFieldProps<T extends FieldValues> = FormFieldProps & {
  control: Control<T>
  name: Path<T>
  required?: boolean
} & WithClassValue

export const ControlledFormField = <T extends FieldValues>({
  control,
  name,
  classValue,
  required,
  ...rest
}: ControlledFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <FormField
            value={value}
            wrapperViewClassName={classValue}
            onBlur={onBlur}
            onChangeText={onChange}
            {...rest}
          />
          {error ? (
            <ThemedText classValue="text-red-500">
              {error.message ?? 'This field is required'}
            </ThemedText>
          ) : null}
        </>
      )}
    />
  )
}
