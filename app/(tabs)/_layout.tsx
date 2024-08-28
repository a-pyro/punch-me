/* eslint-disable react/no-unstable-nested-components -- rn */

import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { HomeTabIcon, ProfileTabIcon, PunchcardsTabIcon } from '@/components'
import { useUser } from '@/services'

const TabsLayout = () => {
  const { user } = useUser()
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
