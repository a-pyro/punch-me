import { type Profile } from '@/supabase'

import { BusinessHomeView } from './business'
import { CustomerHomeView } from './customer'
import { DraftHomeView } from './draft'

export const HomeViews: Record<Profile['role'], React.ComponentType> = {
  customer: CustomerHomeView,
  draft: DraftHomeView,
  store_owner: BusinessHomeView,
}
