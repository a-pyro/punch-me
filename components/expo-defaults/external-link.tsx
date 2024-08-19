import { type Href, Link } from 'expo-router'
import { openBrowserAsync } from 'expo-web-browser'
import { type ComponentProps } from 'react'
import { type GestureResponderEvent, Platform } from 'react-native'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

export const ExternalLink = ({ href, ...rest }: Props): JSX.Element => {
  const handlePress = async (
    event: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement>,
  ): Promise<void> => {
    if (Platform.OS !== 'web') {
      // Prevent the default behavior of linking to the default browser on native.
      event.preventDefault()
      // Open the link in an in-app browser.
      await openBrowserAsync(href)
    }
  }

  return (
    <Link
      className="asd"
      target="_blank"
      {...rest}
      href={href as Href<string>}
      onPress={handlePress}
    />
  )
}
