import { type Profile } from '@/supabase'

import { CustomerHomeView } from './customer'
import { DraftHomeView } from './draft'
import { StoreOwnerHomeView } from './store'

export const HomeViews: Record<Profile['role'], React.ComponentType> = {
  customer: CustomerHomeView,
  draft: DraftHomeView,
  store_owner: StoreOwnerHomeView,
}
