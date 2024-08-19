/* eslint-disable @typescript-eslint/no-unnecessary-condition  -- nn*/
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCurrentUser } from '@/lib'

type UserRole = 'admin' | 'puncher' | 'punched'

export type BaseUser = {
  username: string
  email: string
  accountId: string
  avatar: string
}

export type PuncherUser = BaseUser & {
  role: Extract<UserRole, 'puncher'>
  punchedUsers: string[]
}

export type AdminUser = BaseUser & {
  role: Extract<UserRole, 'admin'>
}

export type PunchedUser = BaseUser & {
  role: Extract<UserRole, 'punched'>
  punchers: string[] // the accountId of the punchers
}

export type User = PuncherUser | AdminUser | PunchedUser

type UserContextType = {
  user: User | null
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
  setUser: (user: User | null) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        const us = res as unknown as User
        if (us) {
          setIsLogged(true)
          setUser(us)
        } else {
          setIsLogged(false)
          setUser(null)
        }
      })
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console -- error handling
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <UserContext.Provider
      value={{ user, isLogged, setIsLogged, setUser, loading }}
    >
      {children}
    </UserContext.Provider>
  )
}
