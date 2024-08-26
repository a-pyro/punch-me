import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type StoreInsert } from '@/supabase'

import { ThemedButton, ThemedView } from '../common'
import { ControlledFormField } from '../form'

// {
//     address?: string | null;
//     contact_email?: string | null;
//     contact_phone?: string | null;
//     created_at?: string | null;
//     id?: string;
//     logo_url?: string | null;
//     name: string;
//     store_hours?: Json | null;
//     user_id: string;
//     website_url?: string | null;
// }

export const StoreCreateForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<StoreInsert>()

  return (
    <ThemedView>
      <ControlledFormField
        required
        control={control}
        name="name"
        placeholder={t('store.create_form.name_placeholder')}
        title={t('store.create_form.name')}
      />
      <ThemedButton
        onPress={handleSubmit((data) => {
          console.log(data)
        })}
      >
        {t('store.create_form.submit')}
      </ThemedButton>
    </ThemedView>
  )
}
