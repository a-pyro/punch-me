import Reactotron from 'reactotron-react-native'
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query'

import { queryClient } from './query-client'

const queryClientManager = new QueryClientManager({
  // @ts-expect-error  -- code take from the officiacl repo
  queryClient,
})

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe()
    },
  })
  .useReactNative()
  .connect()
