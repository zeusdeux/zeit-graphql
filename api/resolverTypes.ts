import { ZeitAPI } from './zeitHttpDataSource'

export interface Args {
  readonly teamId?: string
}

export interface ZeitGqlContext {
  readonly authToken: string
  readonly dataSources: {
    readonly zeitAPI: ZeitAPI
  }
}
