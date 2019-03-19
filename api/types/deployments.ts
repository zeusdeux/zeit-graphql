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

  // this are trivial resolvers hence optional
  SuccintDeployment?: {
    [key in keyof SuccintDeployment]?: (parent: SuccintDeployment) => SuccintDeployment[key]
  }
  User?: { [key in keyof User]?: (parent: User) => User[key] }
  DeploymentState?: (parent: DeploymentState) => [keyof typeof DeploymentState]

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
