import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { Args, ZeitGqlContext } from './resolverTypes'
import { File, HttpMethod, ReadyState, Region } from './sharedTypeDefs'

export enum TargetEnv {
  staging = 'staging',
  production = 'production'
}

export interface Route {
  src: string
  dest?: string
  headers?: { [key: string]: string }
  status?: number
  methods?: HttpMethod[]
}

export interface DeploymentArgs extends Args {
  deploymentId: string
}

export interface Deployment {
  id: string
  url?: string
  name: string
  // meta: <> Need to figure out how to describe the type of meta as it's user controlled
  version: number
  regions: Region[]
  routes?: Route[]
  plan: string
  public: boolean
  ownerId: string
  readyState: ReadyState
  createdAt: string
  createdIn: Region
  // env: <> Same problem as meta. It's user defined. Figure this out.
  // build: BuildEnv
  target?: TargetEnv
  aliasFinal?: string[]
}

export type DeploymentTypeResolver = {
  [key in keyof Deployment]?: (
    parent: Deployment & {
      teamId?: string
    }
  ) => Deployment[key]
} & {
  files: (
    parent: Deployment & {
      teamId?: string
    },
    args: {},
    context: ZeitGqlContext,
    info: IGraphQLToolsResolveInfo
  ) => Promise<File[]>

  builds: (
    parent: Deployment & {
      teamId?: string
    },
    args: {},
    context: ZeitGqlContext,
    info: IGraphQLToolsResolveInfo
  ) => Promise<any> // TODO: Update this to Promise<Array<Build & { teamId?: string }>> after solving the circular dependency
}

export interface DeploymentResolverType {
  Query: {
    deployment: (
      parent: {},
      args: DeploymentArgs,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<Deployment & { teamId?: string }>
  }

  // marking all trivial resolvers as optional so that things typecheck
  // this is because trivial resolvers are not defined in the resolver for Deployment type itself
  // as they are as simple as, for e.g., id: parent => parent.id
  Deployment: DeploymentTypeResolver

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
