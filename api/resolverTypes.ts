import { ZeitAPI } from './zeitHttpDataSource'

export interface Args {
  readonly teamId?: string
}

export interface ZeitGqlDataSources {
  readonly dataSources: {
    readonly zeitAPI: ZeitAPI
  }
}
