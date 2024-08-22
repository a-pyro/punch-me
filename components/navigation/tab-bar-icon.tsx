import { Image, type ImageSourcePropType, Text, View } from 'react-native'

import { icons } from '@/constants'
import { cn } from '@/utils'

type Props = {
  icon: ImageSourcePropType
  color: string
  name: string
  focused: boolean
}

export const TabBarIcon = ({ icon, color, name, focused }: Props) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        className="h-6 w-6"
        resizeMode="contain"
        source={icon}
        tintColor={color}
      />
      <Text
        style={{ color }}
        className={cn('text-xs', {
          'font-psemibold': focused,
          'font-pregular': !focused,
        })}
      >
        {name}
      </Text>
    </View>
  )
}

export const HomeTabIcon = (props: Omit<Props, 'icon' | 'name'>) => (
  <TabBarIcon icon={icons.home} name="Home" {...props} />
)

export const ProfileTabIcon = (props: Omit<Props, 'icon' | 'name'>) => (
  <TabBarIcon icon={icons.profile} name="Profile" {...props} />
)

export const BookmarkTabIcon = (props: Omit<Props, 'icon' | 'name'>) => (
  <TabBarIcon icon={icons.bookmark} name="Saved" {...props} />
)

export const CreateTabIcon = (props: Omit<Props, 'icon' | 'name'>) => (
  <TabBarIcon icon={icons.plus} name="Create" {...props} />
)
