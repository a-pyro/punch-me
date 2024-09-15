// Generated by ts-to-zod
import { z } from 'zod'

import { type Json } from './generated-types'

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
)

export const notificationsRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.string(),
  message: z.string(),
  read: z.boolean().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
})

export const notificationsInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  message: z.string(),
  read: z.boolean().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
})

export const notificationsUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  message: z.string().optional(),
  read: z.boolean().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
})

export const notificationsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('notifications_user_id_fkey'),
    columns: z.tuple([z.literal('user_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('profiles'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const userRoleSchema = z.union([
  z.literal('customer'),
  z.literal('store_owner'),
  z.literal('draft'),
])

export const profilesInsertSchema = z.object({
  address: z.string().optional().nullable(),
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  full_name: z.string().optional().nullable(),
  id: z.string(),
  phone_number: z.string().optional().nullable(),
  role: userRoleSchema.optional(),
  updated_at: z.string().optional().nullable(),
})

export const profilesUpdateSchema = z.object({
  address: z.string().optional().nullable(),
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  full_name: z.string().optional().nullable(),
  id: z.string().optional(),
  phone_number: z.string().optional().nullable(),
  role: userRoleSchema.optional(),
  updated_at: z.string().optional().nullable(),
})

export const profilesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('profiles_id_fkey'),
    columns: z.tuple([z.literal('id')]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal('users'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const punchcardsRowSchema = z.object({
  created_at: z.string().nullable(),
  description: z.string().nullable(),
  expiration_date: z.string().nullable(),
  id: z.string(),
  image_url: z.string().nullable(),
  name: z.string(),
  punches_needed: z.number(),
  store_id: z.string(),
  terms_conditions: z.string().nullable(),
  total_punches: z.number(),
  updated_at: z.string().nullable(),
})

export const punchcardsInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  expiration_date: z.string().optional().nullable(),
  id: z.string().optional(),
  image_url: z.string().optional().nullable(),
  name: z.string(),
  punches_needed: z.number().optional(),
  store_id: z.string(),
  terms_conditions: z.string().optional().nullable(),
  total_punches: z.number().optional(),
  updated_at: z.string().optional().nullable(),
})

export const punchcardsUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  expiration_date: z.string().optional().nullable(),
  id: z.string().optional(),
  image_url: z.string().optional().nullable(),
  name: z.string().optional(),
  punches_needed: z.number().optional(),
  store_id: z.string().optional(),
  terms_conditions: z.string().optional().nullable(),
  total_punches: z.number().optional(),
  updated_at: z.string().optional().nullable(),
})

export const punchcardsRelationshipsSchema = z.tuple([])

export const qrCodesRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.string(),
  punchcard_id: z.string(),
  qr_code_data: z.string(),
  updated_at: z.string().nullable(),
})

export const qrCodesInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string(),
  qr_code_data: z.string(),
  updated_at: z.string().optional().nullable(),
})

export const qrCodesUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string().optional(),
  qr_code_data: z.string().optional(),
  updated_at: z.string().optional().nullable(),
})

export const qrCodesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('qr_codes_punchcard_id_fkey'),
    columns: z.tuple([z.literal('punchcard_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('punchcards'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const reviewsRowSchema = z.object({
  comment: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  punchcard_id: z.string().nullable(),
  rating: z.number().nullable(),
  store_id: z.string(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
})

export const reviewsInsertSchema = z.object({
  comment: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string().optional().nullable(),
  rating: z.number().optional().nullable(),
  store_id: z.string(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
})

export const reviewsUpdateSchema = z.object({
  comment: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string().optional().nullable(),
  rating: z.number().optional().nullable(),
  store_id: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
})

export const reviewsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('reviews_punchcard_id_fkey'),
    columns: z.tuple([z.literal('punchcard_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('punchcards'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
  z.object({
    foreignKeyName: z.literal('reviews_user_id_fkey'),
    columns: z.tuple([z.literal('user_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('profiles'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const locationSchema = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  address: z.string().nullable(),
})

export const storesInsertSchema = z.object({
  contact_email: z.string().optional().nullable(),
  contact_phone: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  location: locationSchema.optional().nullable(),
  logo_url: z.string().optional().nullable(),
  name: z.string(),
  store_hours: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
  website_url: z.string().optional().nullable(),
})

export const storesUpdateSchema = z.object({
  contact_email: z.string().optional().nullable(),
  contact_phone: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  location: locationSchema.optional().nullable(),
  logo_url: z.string().optional().nullable(),
  name: z.string().optional(),
  store_hours: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
  website_url: z.string().optional().nullable(),
})

export const storesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('stores_user_id_fkey'),
    columns: z.tuple([z.literal('user_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('profiles'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const transactionsRowSchema = z.object({
  amount: z.number(),
  created_at: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  punchcard_id: z.string(),
  store_id: z.string(),
  transaction_date: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
})

export const transactionsInsertSchema = z.object({
  amount: z.number(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string(),
  store_id: z.string(),
  transaction_date: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
})

export const transactionsUpdateSchema = z.object({
  amount: z.number().optional(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string().optional(),
  store_id: z.string().optional(),
  transaction_date: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
})

export const transactionsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('transactions_punchcard_id_fkey'),
    columns: z.tuple([z.literal('punchcard_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('punchcards'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
  z.object({
    foreignKeyName: z.literal('transactions_user_id_fkey'),
    columns: z.tuple([z.literal('user_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('profiles'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const userPunchcardsRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.string(),
  punchcard_id: z.string(),
  punches: z.number(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
})

export const userPunchcardsInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string(),
  punches: z.number().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
})

export const userPunchcardsUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  punchcard_id: z.string().optional(),
  punches: z.number().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
})

export const userPunchcardsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('user_punchcards_punchcard_id_fkey'),
    columns: z.tuple([z.literal('punchcard_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('punchcards'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
  z.object({
    foreignKeyName: z.literal('user_punchcards_user_id_fkey'),
    columns: z.tuple([z.literal('user_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('profiles'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const geoPositionSchema = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
})

export const profilesRowSchema = z.object({
  address: z.string().nullable(),
  avatar_url: z.string().nullable(),
  created_at: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  full_name: z.string().nullable(),
  id: z.string(),
  phone_number: z.string().nullable(),
  role: userRoleSchema,
  updated_at: z.string().nullable(),
})

export const storesRowSchema = z.object({
  contact_email: z.string().nullable(),
  contact_phone: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  location: locationSchema.nullable(),
  logo_url: z.string().nullable(),
  name: z.string(),
  store_hours: jsonSchema.nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
  website_url: z.string().nullable(),
})
