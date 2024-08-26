import { useTranslation } from 'react-i18next'

import { Icon, type IconProps } from '../common/icon'

type Props = Omit<IconProps, 'title' | 'name'>

export const HomeTabIcon = (props: Props) => {
  const { t } = useTranslation()
  return <Icon name="home" title={t('tabs.home')} {...props} />
}

export const ProfileTabIcon = (props: Props) => {
  const { t } = useTranslation()
  return <Icon name="user" title={t('tabs.user')} {...props} />
}

export const PunchcardsTabIcon = (props: Props) => {
  const { t } = useTranslation()
  return <Icon name="book" title={t('tabs.punchcards')} {...props} />
}

export const CreateTabIcon = (props: Props) => {
  const { t } = useTranslation()
  return <Icon name="plus" title={t('tabs.create')} {...props} />
}

export const SubscribeTabIcon = (props: Props) => {
  const { t } = useTranslation()

  return <Icon name="star" title={t('tabs.star')} {...props} />
}
