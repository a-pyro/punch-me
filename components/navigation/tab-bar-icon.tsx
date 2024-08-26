import AntDesign from '@expo/vector-icons/AntDesign'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { cn } from '@/utils'
import { ComponentProps } from 'react'

type Props = {
  color?: string
  name: ComponentProps<typeof AntDesign>['name']
  focused?: boolean
  title?: string
}

export const Icon = ({ color = '#CDCDE0', name, focused, title }: Props) => {
  return (
    <View className="items-center justify-center gap-2">
      <AntDesign name={name} size={24} color={color} />
      {!!title && (
        <Text
          style={{ color }}
          className={cn('text-xs', {
            'font-psemibold': focused,
            'font-pregular': !focused,
          })}
        >
          {title}
        </Text>
      )}
    </View>
  )
}
export const HomeTabIcon = (props: Omit<Props, 'title' | 'name'>) => {
  const { t } = useTranslation()
  return <Icon title={t('tabs.home')} name="home" {...props} />
}

export const ProfileTabIcon = (props: Omit<Props, 'title' | 'name'>) => {
  const { t } = useTranslation()
  return <Icon title={t('tabs.user')} name="user" {...props} />
}

export const PunchcardsTabIcon = (props: Omit<Props, 'title' | 'name'>) => {
  const { t } = useTranslation()
  return <Icon title={t('tabs.punchcards')} name="book" {...props} />
}

export const CreateTabIcon = (props: Omit<Props, 'title' | 'name'>) => {
  const { t } = useTranslation()
  return <Icon title={t('tabs.create')} name="plus" {...props} />
}

export const SubscribeTabIcon = (props: Omit<Props, 'title' | 'name'>) => {
  const { t } = useTranslation()
  return <Icon title={t('tabs.star')} name="star" {...props} />
}
