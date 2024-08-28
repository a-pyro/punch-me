import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type WithId } from '@/services'
import { usePunchcardsMutation } from '@/services/api/punchcards'
import { type PunchcardInsert, type PunchcardUpdate } from '@/supabase'

import { ThemedText } from '../common'
import { ThemedButton } from '../common/themed-button'
import { ThemedView } from '../common/themed-view'
import { ControlledFormField } from '../form/controlled-form-field'

type PunchCardsFormProps = {
  action: 'create' | 'update'
}

export const PunchCardsForm = ({ action }: PunchCardsFormProps) => {
  const { id } = useLocalSearchParams<WithId>()
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<PunchcardInsert | PunchcardUpdate>()
  const {
    createMutation: { mutateAsync: createPunchCard, isPending: isCreating },
    updateMutation: { mutateAsync: updatePunchCard, isPending: isUpdating },
  } = usePunchcardsMutation()

  const onSubmit = handleSubmit(async (data) => {
    if (action === 'update') await updatePunchCard(data)
    else await createPunchCard({ ...data, store_id: id } as PunchcardInsert)
  })

  const title =
    action === 'create' ? 'punchcards.form.create' : 'punchcards.form.update'

  return (
    <ThemedView>
      <ThemedText style="title">{t(title)}</ThemedText>
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="name"
        placeholder={t('punchcards.form.name_placeholder')}
        title={t('punchcards.form.name')}
      />
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="description"
        placeholder={t('punchcards.form.description_placeholder')}
        title={t('punchcards.form.description')}
      />
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="punches_needed"
        placeholder={t('punchcards.form.punches_needed_placeholder')}
        title={t('punchcards.form.punches_needed')}
      />
      {/* TODO - make date picker */}
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="expiration_date"
        placeholder={t('punchcards.form.expiration_date_placeholder')}
        title={t('punchcards.form.expiration_date')}
      />

      {/* TODO - make upload from device */}
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="image_url"
        placeholder={t('punchcards.form.image_url_placeholder')}
        title={t('punchcards.form.image_url')}
      />

      {/* TODO - make text area or something easier to fill */}
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="terms_conditions"
        placeholder={t('punchcards.form.terms_conditions_placeholder')}
        title={t('punchcards.form.terms_conditions')}
      />
      <ControlledFormField
        required
        classValue="my-4"
        control={control}
        name="total_punches"
        placeholder={t('punchcards.form.total_punches_placeholder')}
        title={t('punchcards.form.total_punches')}
      />
      <ThemedButton outerClassValue="mt-4" onPress={onSubmit}>
        {t('punchcards.form.create')}
      </ThemedButton>
    </ThemedView>
  )
}
