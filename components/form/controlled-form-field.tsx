import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { Text, View } from 'react-native'

import { type WithClassValue } from '@/utils'

import { ThemedView } from '../common'

import { FormField, type FormFieldProps } from './form-field'

type ControlledFormFieldProps<T extends FieldValues> = FormFieldProps & {
  control: Control<T>
  name: Path<T>
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
} & WithClassValue

export const ControlledFormField = <T extends FieldValues>({
  control,
  name,
  classValue,
  rules,
  ...rest
}: ControlledFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <>
            <FormField
              value={value}
              wrapperViewClassName={classValue}
              onBlur={onBlur}
              onChangeText={onChange}
              {...rest}
            />
            <View className="mb-2">
              <ErrorMessage error={error} />
            </View>
          </>
        )
      }}
    />
  )
}

type ErrorMessageProps = {
  error?: FieldError
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null

  if (error.types) {
    return (
      <ThemedView>
        {Object.entries(error.types).map(([key, value]) => (
          <Text key={key} className="text-sm text-red-700">
            {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- strings */}
            {value || `Validation failed on ${key}`}
          </Text>
        ))}
      </ThemedView>
    )
  }

  if (!error.message && error.type === 'required') {
    return (
      <ThemedView>
        <Text className="text-sm text-red-700">This field is required.</Text>
      </ThemedView>
    )
  }

  if (!error.message) {
    return (
      <ThemedView>
        <Text className="text-sm text-red-700">
          {`Validation error: ${error.type}`}
        </Text>
      </ThemedView>
    )
  }

  return (
    <ThemedView>
      <Text className="text-sm text-red-700">{error.message}</Text>
    </ThemedView>
  )
}
