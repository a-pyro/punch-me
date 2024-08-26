import React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import { ThemedText } from '../common'

import { FormField, type FormFieldProps } from './form-field'

type ControlledFormFieldProps<T extends FieldValues> = FormFieldProps & {
  control: Control<T>
  name: Path<T>
  required?: boolean
}

export const ControlledFormField = <T extends FieldValues>({
  control,
  name,
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
