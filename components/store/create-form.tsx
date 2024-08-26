import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type StoreInsert } from '@/supabase'

import { ThemedText, ThemedView } from '../common'
import { FormField } from '../form'

export const StoreCreateForm = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreInsert>()

  return (
    <ThemedView>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            placeholder={t('store.form.namePlaceholder')}
            title={t('store.form.name')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        rules={{
          required: true,
        }}
      />
      {errors.name ? <ThemedText>This is required.</ThemedText> : null}
    </ThemedView>
  )
}
