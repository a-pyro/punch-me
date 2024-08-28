import {
  type Tables,
  type TablesInsert,
  type TablesUpdate,
} from './generated-types'

export const COLLECTIONS = {
  users: 'users',
  stores: 'stores',
  punchcards: 'punchcards',
} as const

export type User = Tables<'users'>
export type UserInsert = TablesInsert<'users'>
export type UserUpdate = Omit<TablesUpdate<'users'>, 'password'>

export type Store = Tables<'stores'>
export type StoreInsert = TablesInsert<'stores'>
export type StoreUpdate = TablesUpdate<'stores'>

export type Punchcard = Tables<'punchcards'>
export type PunchcardInsert = TablesInsert<'punchcards'>
export type PunchcardUpdate = TablesUpdate<'punchcards'>
