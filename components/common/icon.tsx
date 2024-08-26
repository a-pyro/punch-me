import AntDesign from '@expo/vector-icons/AntDesign'
import { type ComponentProps } from 'react'
import { Text, View } from 'react-native'

import { cn } from '@/utils'

export type IconProps = {
  color?: string
  name: ComponentProps<typeof AntDesign>['name']
  focused?: boolean
  title?: string
}

export const Icon = ({
  color = '#CDCDE0',
  name,
  focused,
  title,
}: IconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <AntDesign color={color} name={name} size={24} />
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
