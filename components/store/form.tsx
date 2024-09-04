import { router, useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'

import { useSession } from '@/context/session'
import { type WithId, useUpdateProfile } from '@/services'
import {
  useCreateStore,
  useGetStore,
  useUpdateStore,
} from '@/services/api/stores/hooks'
import { type StoreInsert } from '@/supabase'
import { storesInsertSchema, storesUpdateSchema } from '@/supabase/zod-types'
import { useAsyncForm } from '@/utils/forms/hooks'

import { LoadingScreen, ThemedButton, ThemedView } from '../common'
import { ControlledFormField } from '../form'

// TODO - ADD STICKY HEADER and rest of the form fields
// TODO - Handle loading and validation
export type FormOperation = 'insert' | 'update'
type StoreCreateFormProps = {
  operation: FormOperation
}

export const StoreForm = ({ operation }: StoreCreateFormProps) => {
  const { id } = useLocalSearchParams<WithId>()
  const { t } = useTranslation()
  const { getStoreAsync, isGettingAsync } = useGetStore({
    storeId: id,
    enabled: false,
  })
  const { control, handleSubmit } = useAsyncForm<StoreInsert>({
    operation,
    getAsyncData: () => getStoreAsync(id),
    schema: operation === 'insert' ? storesInsertSchema : storesUpdateSchema,
  })
  const { profile } = useSession()

  const { createStore, isPending: isCreatingStore } = useCreateStore()
  const { updateStore, isPending: isUpdatingStore } = useUpdateStore()
  const { updateProfile, isPending: isUpdatingProfile } = useUpdateProfile()

  const onSubmit = handleSubmit(async (data) => {
    const fn = operation === 'insert' ? createStore : updateStore
    const { id } = await fn({ ...data, user_id: profile.id })
    if (profile.role !== 'store_owner')
      await updateProfile({ ...profile, role: 'store_owner' })
    router.push({
      pathname: '/store/[id]/view',
      params: { id },
    })
  })

  if (isCreatingStore || isUpdatingProfile || isUpdatingStore || isGettingAsync)
    return <LoadingScreen />

  return (
    <ThemedView>
      <ControlledFormField
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('store.create_form.name_placeholder')}
        title={t('store.create_form.name')}
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="address"
        placeholder={t('store.create_form.address_placeholder')}
        title={t('store.create_form.address')}
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="contact_email"
        placeholder={t('store.create_form.contact_email_placeholder')}
        title={t('store.create_form.contact_email')}
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="contact_phone"
        placeholder={t('store.create_form.contact_phone_placeholder')}
        title={t('store.create_form.contact_phone')}
        onSubmitEditing={onSubmit}
      />
      {/* TODO - UPLOADER COMPONENT */}
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="logo_url"
        placeholder={t('store.create_form.logo_url_placeholder')}
        title={t('store.create_form.logo_url')}
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="store_hours"
        placeholder={t('store.create_form.store_hours_placeholder')}
        title={t('store.create_form.store_hours')}
        onSubmitEditing={onSubmit}
      />
      <ControlledFormField
        classValue="mb-4"
        control={control}
        name="website_url"
        placeholder={t('store.create_form.website_url_placeholder')}
        title={t('store.create_form.website_url')}
        onSubmitEditing={onSubmit}
      />
      <ThemedButton outerClassValue="mt-4" onPress={onSubmit}>
        {t(operation === 'insert' ? 'store.from.create' : 'store.from.update')}
      </ThemedButton>
    </ThemedView>
  )
}
