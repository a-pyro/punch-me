import {
  type Tables,
  type TablesInsert,
  type TablesUpdate,
} from './generated-types'

export type User = Tables<'users'>
export type UserInsert = TablesInsert<'users'>
export type UserUpdate = TablesUpdate<'users'>
