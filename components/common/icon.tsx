import AntDesign from '@expo/vector-icons/AntDesign'
import { type ComponentProps } from 'react'
import { Text, View } from 'react-native'

import { type WithouterClassValue, cn } from '@/utils'

export type IconProps = {
  color?: string
  name: ComponentProps<typeof AntDesign>['name']
  focused?: boolean
  title?: string
} & WithouterClassValue

export const Icon = ({
  color = '#CDCDE0',
  name,
  focused,
  outerClassValue = '',
  title,
}: IconProps) => {
  return (
    <View className={cn('items-center justify-center gap-2', outerClassValue)}>
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
