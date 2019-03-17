import { ZeitAPI } from './zeitHttpDataSource'

export interface Args {
  readonly teamId?: string
}

export interface ZeitGqlContext {
  readonly dataSources: {
    readonly zeitAPI: ZeitAPI
  }
}
