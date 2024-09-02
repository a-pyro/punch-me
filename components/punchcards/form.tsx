import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type WithId } from '@/services'
import {
  useGetPunchcard,
  usePunchcardsMutation,
} from '@/services/api/punchcards'
import { type PunchcardInsert, type PunchcardUpdate } from '@/supabase'

import { LoadingScreen, ThemedButton, ThemedText } from '../common'
import { ThemedView } from '../common/themed-view'
import { ControlledFormField } from '../form/controlled-form-field'
import { type FormOperation } from '../store'

type PunchCardsFormProps = {
  operation: FormOperation
}

export const PunchCardsForm = ({ operation }: PunchCardsFormProps) => {
  const { id } = useLocalSearchParams<WithId>()
  const { getAsyncPunchcard } = useGetPunchcard(id)
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<PunchcardInsert | PunchcardUpdate>({
    defaultValues:
      operation === 'update'
        ? async () => {
            const asd = await getAsyncPunchcard(id)
            return asd
          }
        : { punches_needed: 10 },
  })
  const {
    createMutation: { mutateAsync: createPunchCard, isPending: isCreating },
    updateMutation: { mutateAsync: updatePunchCard, isPending: isUpdating },
  } = usePunchcardsMutation()

  const onSubmit: SubmitHandler<PunchcardUpdate | PunchcardInsert> = async (
    punchcard,
  ) => {
    if (operation === 'create') {
      await createPunchCard({ ...punchcard, store_id: id } as PunchcardInsert)
    } else {
      await updatePunchCard(punchcard as PunchcardUpdate)
    }
    router.push({
      pathname: '/',
      params: { id },
    })
  }

  const title =
    operation === 'create' ? 'punchcards.form.create' : 'punchcards.form.update'

  if (isCreating || isUpdating) return <LoadingScreen />

  return (
    <ThemedView>
      <ThemedText style="title">{t(title)}</ThemedText>

      <ControlledFormField
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('punchcards.form.name_placeholder')}
        rules={{ required: true }}
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
        rules={{ required: true }}
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
      <ThemedButton onPress={handleSubmit((d) => onSubmit(d))}>
        {t(
          operation === 'create'
            ? 'punchcards.form.create'
            : 'punchcards.form.update',
        )}
      </ThemedButton>
    </ThemedView>
  )
}
