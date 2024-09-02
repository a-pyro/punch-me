import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useSession } from '@/context'
import { useCreateStore, useUpdateProfile, useUpdateStore } from '@/services'
import { type StoreInsert } from '@/supabase'

import { LoadingScreen, ThemedButton, ThemedView } from '../common'
import { ControlledFormField } from '../form'

// TODO - ADD STICKY HEADER and rest of the form fields
// TODO - Handle loading and validation
export type FormOperation = 'create' | 'update'
type StoreCreateFormProps = {
  operation: FormOperation
}

export const StoreForm = ({ operation }: StoreCreateFormProps) => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<StoreInsert>()
  const { profile } = useSession()

  const { createStore, isPending: isCreatingStore } = useCreateStore()
  const { updateStore, isPending: isUpdatingStore } = useUpdateStore()
  const { updateProfile, isPending: isUpdatingProfile } = useUpdateProfile()

  const onSubmit = handleSubmit(async (data) => {
    const fn = operation === 'create' ? createStore : updateStore
    const { id } = await fn({ ...data, user_id: profile.id })
    if (profile.role !== 'store_owner')
      await updateProfile({ ...profile, role: 'store_owner' })
    router.push({
      pathname: '/store/[id]/view',
      params: { id },
    })
  })

  if (isCreatingStore || isUpdatingProfile || isUpdatingStore)
    return <LoadingScreen />

  return (
    <ThemedView>
      <ControlledFormField
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('store.create_form.name_placeholder')}
        rules={{ required: true }}
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
      <ThemedButton outerClassValue="mt-4" onPress={onSubmit}>
        {t('store.create_form.create')}
      </ThemedButton>
    </ThemedView>
  )
}
