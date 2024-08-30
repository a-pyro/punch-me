/* eslint-disable @typescript-eslint/no-floating-promises -- supabase docs
https://supabase.com/docs/guides/auth/quickstarts/react-native  */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

import { handleSupabaseError } from '@/services/api/utils/error'
import 'react-native-url-polyfill/auto'

import {
  type Database,
  type Tables,
  type TablesInsert,
  type TablesUpdate,
} from './generated-types'
import { type Collection } from './types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey)
  throw new Error('Missing Supabase URL or Supabase Anon Key')

export const supabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabaseClient.auth.startAutoRefresh()
  } else {
    supabaseClient.auth.stopAutoRefresh()
  }
})

export const httpClient = {
  create: async <TCollection extends Collection>(
    collection: TCollection,
    data: TablesInsert<TCollection>,
  ) => {
    // We cast the result to the appropriate type using a type assertion.
    const { data: responseData, error } = await supabaseClient
      .from(collection)
      .insert(data as never)
      .select()
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return responseData as Tables<TCollection>
  },

  update: async <TCollection extends Collection>(
    collection: TCollection,
    data: TablesUpdate<TCollection>,
  ) => {
    const { data: responseData, error } = await supabaseClient
      .from(collection)
      .update(data as never)
      .eq('id', data.id as never)
      .select()
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return responseData as Tables<TCollection>
  },

  getOne: async <TCollection extends Collection>(
    collection: TCollection,
    id: string,
  ) => {
    const { data, error } = await supabaseClient
      .from(collection)
      .select()
      .eq('id', id as never)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return data as Tables<TCollection>
  },

  getList: async <
    TCollection extends Collection,
    TFilter extends keyof Tables<TCollection>,
  >(
    collection: TCollection,
    filter?: { [key in TFilter]?: string | number | boolean },
  ) => {
    let query = supabaseClient.from(collection).select()

    if (filter) {
      Object.keys(filter).forEach((key) => {
        query = query.eq(key, filter[key as TFilter] as never)
      })
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return data as Tables<TCollection>[]
  },
}
