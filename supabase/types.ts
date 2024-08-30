import {
  type Database,
  type Tables,
  type TablesInsert,
  type TablesUpdate,
} from './generated-types'

export const COLLECTIONS = {
  profiles: 'profiles',
  stores: 'stores',
  punchcards: 'punchcards',
} as const

// Override the type for a specific column in a view:
export type Collection = keyof Database['public']['Tables']

export type Profile = Tables<'profiles'>
export type ProfileInsert = TablesInsert<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

export type Store = Tables<'stores'>
export type StoreInsert = TablesInsert<'stores'>
export type StoreUpdate = TablesUpdate<'stores'>

export type Punchcard = Tables<'punchcards'>
export type PunchcardInsert = TablesInsert<'punchcards'>
export type PunchcardUpdate = TablesUpdate<'punchcards'>
