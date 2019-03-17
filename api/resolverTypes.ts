import { ZeitAPI } from './zeitHttpDataSource'

export interface Args {
  teamId?: string
}

export interface ZeitGqlDataSources {
  dataSources: {
    zeitAPI: ZeitAPI
  }
}
