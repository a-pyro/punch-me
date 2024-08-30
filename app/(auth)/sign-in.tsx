import React from 'react'

import { AuthForm, SafeView } from '@/components'

const SignInView = () => {
  return (
    <SafeView>
      <AuthForm />
    </SafeView>
  )
}

export default SignInView
