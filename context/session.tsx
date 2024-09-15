import { type Session } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { logger } from '@/services/logger'
import { ENTITIES, type Profile, httpClient, supabaseClient } from '@/supabase'
import { invalidateQueries } from '@/utils/react-query'

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
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () =>
      invalidateQueries([ENTITIES.profiles, { userId: session?.user.id }]),
  })

  const queryResult = useQuery({
    queryKey: [ENTITIES.profiles, { userId: session?.user.id }],
    queryFn: () =>
      session ? httpClient.getOne('profiles', session.user.id) : undefined,
    select: (data) => {
      return { ...data, email: session?.user.email } as Profile
    },
    enabled: !!session,
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
        signOut: signOutMutation.mutateAsync,
        session,
        profile: queryResult.data ?? INIT_PROFILE,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
