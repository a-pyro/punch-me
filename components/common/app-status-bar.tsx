import { StatusBar, type StatusBarStyle } from 'expo-status-bar'
import React from 'react'

export type AppStatusBarProps = {
  backgroundColor?: string
  style?: StatusBarStyle
}

export const AppStatusBar: React.FC<AppStatusBarProps> = ({
  backgroundColor = '#161622',
  style = 'auto',
}) => <StatusBar backgroundColor={backgroundColor} style={style} />
