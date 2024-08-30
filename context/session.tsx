import { type Session } from '@supabase/supabase-js'
import { router } from 'expo-router'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { logger } from '@/services/logger'
import { supabaseClient } from '@/supabase'

export const signOut = () => supabaseClient.auth.signOut()

const AuthContext = createContext<{
  signOut: typeof signOut
  session?: Session | null
}>({
  signOut,
  session: null,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- https://docs.expo.dev/router/reference/authentication/#example-authentication-context
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

const checkSession = async () => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession()
  return session
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    void checkSession().then((session) => {
      setSession(session)
      if (!session) router.replace('/')
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      logger.log('🚀 ~ onAuthStateChange ~ event:', event)
      setSession(session)
      if (!session) router.replace('/')
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signOut,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
