import { type Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { logger } from '@/services/logger'
import {
  COLLECTIONS,
  httpClient,
  // COLLECTIONS,
  type Profile,
  // httpClient,
  supabaseClient,
} from '@/supabase'

export const signOut = () => supabaseClient.auth.signOut()

const INIT_PROFILE: Profile = {
  address: '',
  avatar_url: '',
  created_at: '',
  date_of_birth: '',
  email: '',
  full_name: '',
  id: '',
  phone_number: '',
  role: 'draft',
  updated_at: '',
}

const AuthContext = createContext<{
  signOut: typeof signOut
  session?: Session | null
  profile: Profile
}>({
  signOut,
  session: null,
  profile: INIT_PROFILE,
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

  const queryResult = useQuery({
    queryKey: [COLLECTIONS.profiles],
    queryFn: () => httpClient.getOne('profiles', session?.user.id),
    select: (data) => ({ ...data, email: session?.user.email }),
  })

  useEffect(() => {
    void checkSession().then((session) => {
      logger.log('🚀 ~ checkSession ~ session:', session)
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      logger.log('🚀 ~ onAuthStateChange ~ event:', event)
      logger.log('🚀 ~ onAuthStateChange ~ session:', session)
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
        profile: (queryResult.data ?? INIT_PROFILE) as Profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
