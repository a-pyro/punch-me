import { QueryClient } from '@tanstack/react-query'

/* 

https://tanstack.com/query/latest/docs/framework/react/react-native

https://github.com/hsndmr/reactotron-react-query

*/

const queryClient = new QueryClient()

export const invalidateQueries = (queryKey: string[]) =>
  queryClient.invalidateQueries({ queryKey: [queryKey] })

export { queryClient }
