import {
  type Tables,
  type TablesInsert,
  type TablesUpdate,
} from './generated-types'

export type User = Tables<'users'>
export type UserCreate = TablesInsert<'users'>
export type UserUpdate = TablesUpdate<'users'>
