import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { Args, ZeitGqlContext } from './resolverTypes'
import { DeploymentState, File, HttpMethod, Region } from './sharedTypeDefs'

export enum TargetEnv {
  staging = 'staging',
  production = 'production'
}

export interface SuccinctBuild {
  src: string
  use: string
}

export interface Route {
  src: string
  dest?: string
  headers?: { [key: string]: string }
  status?: number
  methods?: HttpMethod[]
}

export interface Lambda {
  id: string
  entrypoint: string
  readyState: DeploymentState
  readyStateAt: string
  createdAt: string
  output?: LambdaOutput[]
}

interface LambdaOutput {
  path: string
  functionName: string
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
  builds: SuccinctBuild[]
  plan: string
  public: boolean
  ownerId: string
  readyState: DeploymentState
  createdAt: string
  createdIn: Region
  // env: <> Same problem as meta. It's user defined. Figure this out.
  // build: BuildEnv
  target?: TargetEnv
  aliasFinal?: string[]
  lambdas?: Lambda[]
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
