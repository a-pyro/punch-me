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

// TODO - ADD STICKY HEADER and rest of the form fields
export const StoreCreateForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<StoreInsert>()

  return (
    <ThemedView>
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('store.create_form.name_placeholder')}
        title={t('store.create_form.name')}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="address"
        placeholder={t('store.create_form.address_placeholder')}
        title={t('store.create_form.address')}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="contact_email"
        placeholder={t('store.create_form.contact_email_placeholder')}
        title={t('store.create_form.contact_email')}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="contact_phone"
        placeholder={t('store.create_form.contact_phone_placeholder')}
        title={t('store.create_form.contact_phone')}
      />
      {/* TODO - UPLOADER COMPONENT */}
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="logo_url"
        placeholder={t('store.create_form.logo_url_placeholder')}
        title={t('store.create_form.logo_url')}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="store_hours"
        placeholder={t('store.create_form.store_hours_placeholder')}
        title={t('store.create_form.store_hours')}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="website_url"
        placeholder={t('store.create_form.website_url_placeholder')}
        title={t('store.create_form.website_url')}
      />
      <ThemedButton
        outerClassValue="mt-4"
        onPress={handleSubmit((data) => {
          console.log(data)
        })}
      >
        {t('store.create_form.submit')}
      </ThemedButton>
    </ThemedView>
  )
}
