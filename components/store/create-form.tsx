import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCreateStore, useUpdateUser, useUser } from '@/services'
import { type StoreInsert } from '@/supabase'

import { ThemedButton, ThemedText, ThemedView } from '../common'
import { ControlledFormField } from '../form'

// TODO - ADD STICKY HEADER and rest of the form fields
// TODO - Handle loading and validation
export const StoreCreateForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<StoreInsert>()
  const { user } = useUser()

  const { createStore, isPending: isCreatingStore } = useCreateStore()
  const { updateUser, isPending: isUpdatingUser } = useUpdateUser()

  if (!user) return null

  const onSubmit = handleSubmit(async (data) => {
    const { id } = await createStore({ ...data, user_id: user.id })
    if (user.role !== 'store_owner')
      await updateUser({ ...user, role: 'store_owner' })
    router.push(`/store/${id}`)
  })

  if (isCreatingStore || isUpdatingUser)
    return <ThemedText>Loading...🍌🍌🍌</ThemedText>

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
      <ThemedButton outerClassValue="mt-4" onPress={onSubmit}>
        {t('store.create_form.create')}
      </ThemedButton>
    </ThemedView>
  )
}
