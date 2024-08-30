import Reactotron from 'reactotron-react-native'

export const logger = {
  log: (...args: unknown[]) => {
    Reactotron.log(args)
  },
}
