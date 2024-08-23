/* eslint-disable @typescript-eslint/no-unsafe-assignment -- rn fonts */
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
// eslint-disable-next-line import/order -- a
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import 'react-native-url-polyfill/auto'

import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { AppStatusBar } from '@/components'
import '@/i18n'
import { queryClient } from '@/services'

if (__DEV__) require('../services/react-query/reactotron.ts')

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  useReactQueryDevTools(queryClient)

  const colorScheme = useColorScheme()
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) void SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              // nasconde il nome della pagina nell'header (che mette di default il nome della pagina corrente)
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              // nasconde il nome della pagina nell'header (che mette di default il nome della pagina corrente)
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              // nasconde il nome della pagina nell'header (che mette di default il nome della pagina corrente)
            }}
          />
          {/* <Stack.Screen
              name="/search/[query]"
              options={{
                headerShown: false,
                // nasconde il nome della pagina nell'header (che mette di default il nome della pagina corrente)
              }}
            /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <AppStatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default RootLayout
