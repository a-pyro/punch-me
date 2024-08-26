/* eslint-disable react/no-unstable-nested-components -- rn */

import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import {
  CreateTabIcon,
  HomeTabIcon,
  ProfileTabIcon,
  PunchcardsTabIcon,
  SubscribeTabIcon,
} from '@/components'
import { useUser } from '@/services'

const TabsLayout = () => {
  const { user } = useUser()
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- if something happens and the user is not logged in, redirect to the sign-in page
  if (!user) return <Redirect href="/sign-in" />
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 70,
          paddingVertical: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home" // the name of the screen (home.tsx)
        options={{
          title: 'home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'store',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <CreateTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscribe"
        options={{
          title: 'subscribe',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <SubscribeTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="punchcards"
        options={{
          title: 'punchcards',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <PunchcardsTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <ProfileTabIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
