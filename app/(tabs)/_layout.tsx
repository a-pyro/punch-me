/* eslint-disable react/no-unstable-nested-components -- rn */

import { Tabs } from 'expo-router'
import React from 'react'

import { HomeTabIcon, ProfileTabIcon, PunchcardsTabIcon } from '@/components'

const TabsLayout = () => {
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
        name="home"
        options={{
          title: 'home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="user-punchcards"
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
      <Tabs.Screen
        name="stores"
        options={{
          title: 'stores',
          href: null,
          // headerShown: false,
          headerTitle: 'TABS LAYOUT - tab.screen (stores)',
        }}
      />
      <Tabs.Screen
        name="punchcards/[id]"
        options={{
          title: 'punchcards',
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="subscribe"
        options={{
          title: 'subscribe',
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
