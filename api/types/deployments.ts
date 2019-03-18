import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { Args, ZeitGqlContext } from './resolverTypes'
import { DeploymentState } from './sharedTypeDefs'

export interface SuccintDeployment {
  uid: string
  name: string
  url?: string
  created: string
  creator: User
  state: DeploymentState
}

interface User {
  uid: string
}

export interface DeploymentsResolverType {
  Query: {
    deployments: (
      parent: {},
      args: Args,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<SuccintDeployment[]>
  }

  // this is a trivial resolver hence optional
  SuccintDeployment?: {
    [P in keyof SuccintDeployment]?: (parent: SuccintDeployment) => SuccintDeployment[P]
  }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
