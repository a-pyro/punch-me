import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { type PunchcardInsert, type PunchcardUpdate } from '@/supabase'

// type Punchcard = {
//   created_at: string | null
//   description: string | null
//   expiration_date: string | null
//   id: string
//   image_url: string | null
//   name: string
//   punches_needed: number
//   store_id: string
//   terms_conditions: string | null
//   total_punches: number
// }

export const PunchCardsForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<PunchcardInsert | PunchcardUpdate>()
  return (
    <View>
      <Text>PunchCardsCreateForm</Text>
    </View>
  )
}
