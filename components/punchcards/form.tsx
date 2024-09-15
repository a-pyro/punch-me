import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type WithId } from '@/services'
import {
  useGetPunchcard,
  usePunchcardsMutation,
} from '@/services/api/punchcards'
import { type PunchcardInsert, type PunchcardUpdate } from '@/supabase'
import {
  punchcardsInsertSchema,
  punchcardsUpdateSchema,
} from '@/supabase/zod-types'
import { useAsyncForm } from '@/utils/forms/hooks'

import { LoadingScreen, ThemedButton, ThemedText } from '../common'
import { ThemedView } from '../common/themed-view'
import { ControlledFormField } from '../form/controlled-form-field'
import { type FormOperation } from '../store'

type PunchCardsFormProps = {
  operation: FormOperation
}

export const PunchCardsForm = ({ operation }: PunchCardsFormProps) => {
  const { id } = useLocalSearchParams<WithId>()
  const { getPunchcardAsync: getAsyncPunchcard } = useGetPunchcard(id)
  const { t } = useTranslation()
  const { control, handleSubmit } = useAsyncForm<
    PunchcardInsert | PunchcardUpdate
  >({
    defaultValues: { punches_needed: 10, store_id: id },
    getAsyncData: () => getAsyncPunchcard(id),
    operation,
    schema:
      operation === 'insert' ? punchcardsInsertSchema : punchcardsUpdateSchema,
  })

  const {
    createMutation: { mutateAsync: createPunchCard, isPending: isCreating },
    updateMutation: { mutateAsync: updatePunchCard, isPending: isUpdating },
  } = usePunchcardsMutation()

  const onSubmit: SubmitHandler<PunchcardUpdate | PunchcardInsert> = async (
    punchcard,
  ) => {
    if (operation === 'insert') {
      await createPunchCard({ ...punchcard, store_id: id } as PunchcardInsert)
    } else {
      await updatePunchCard(punchcard as PunchcardUpdate)
    }
    router.navigate({
      pathname: '/punchcards/[id]/view',
      params: { id },
    })
  }

  const title =
    operation === 'insert' ? 'punchcards.form.create' : 'punchcards.form.update'

  if (isCreating || isUpdating) return <LoadingScreen />

  return (
    <ThemedView className="pb-3">
      <ThemedText style="title">{t(title)}</ThemedText>

      <ControlledFormField
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('punchcards.form.name_placeholder')}
        title={t('punchcards.form.name')}
      />
      <ControlledFormField
        classValue="my-4"
        control={control}
        name="description"
        placeholder={t('punchcards.form.description_placeholder')}
        title={t('punchcards.form.description')}
      />
      <ControlledFormField
        classValue="my-4"
        control={control}
        defaultValue="10"
        name="punches_needed"
        placeholder={t('punchcards.form.punches_needed_placeholder')}
        title={t('punchcards.form.punches_needed')}
      />
      {/* TODO - make date picker */}
      <ControlledFormField
        classValue="my-4"
        control={control}
        name="expiration_date"
        placeholder={t('punchcards.form.expiration_date_placeholder')}
        title={t('punchcards.form.expiration_date')}
      />

      {/* TODO - make upload from device */}

      {/* <ControlledFormField
        classValue="my-4"
        control={control}
        name="image_url"
        placeholder={t('punchcards.form.image_url_placeholder')}
        title={t('punchcards.form.image_url')}
      />

      {/* TODO - make text area or something easier to fill */}
      {/* <ControlledFormField
        classValue="my-4"
        control={control}
        name="terms_conditions"
        placeholder={t('punchcards.form.terms_conditions_placeholder')}
        title={t('punchcards.form.terms_conditions')}
      />
      <ControlledFormField
        classValue="my-4"
        control={control}
        name="total_punches"
        placeholder={t('punchcards.form.total_punches_placeholder')}
        title={t('punchcards.form.total_punches')}
      /> */}
      <ThemedButton c onPress={handleSubmit((d) => onSubmit(d))}>
        {t(
          operation === 'insert'
            ? 'punchcards.form.create'
            : 'punchcards.form.update',
        )}
      </ThemedButton>
    </ThemedView>
  )
}
