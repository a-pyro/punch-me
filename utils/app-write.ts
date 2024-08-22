import { type BaseUser } from '@/context'

export const createUser = async ({
  email,
  password,
  userName,
}: {
  email: string
  password: string
  userName: string
}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email, password, userName })
    }, 1000)
  })

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email, password })
    }, 1000)
  })
const fakeUser: BaseUser = {
  username: 'fakeUser',
  email: 'asd@edqaew.it',
  accountId: '123',
  avatar: 'https://fake.com',
}

export const getCurrentUser = async (): Promise<BaseUser> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeUser)
    }, 1000)
  })
