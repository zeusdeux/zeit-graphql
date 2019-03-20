import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { Deployment, DeploymentArgs } from './deployment'
import { ZeitGqlContext } from './resolverTypes'
import { DeploymentState, FileType, Region } from './sharedTypeDefs'

interface BuiltLambdaInfo {
  functionName: string
  deployedTo: Region[]
}

interface BuildOutput {
  type: FileType
  path: string
  digest: string
  mode: number
  size: number
  lambda?: BuiltLambdaInfo
}

export interface Build {
  id: string
  entrypoint: string
  deploymentId: string
  use: string
  createdIn: Region
  scheduledAt?: string
  createdAt: string
  readyState: DeploymentState
  readyStateAt: string
  output?: BuildOutput[]
}

export interface BuildsInDeploymentResolverType {
  Query: {
    buildsInDeployment: (
      parent: {},
      args: DeploymentArgs,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<Array<Build & { teamId?: string }>>
  }

  // trivial resolvers and hence optional
  Build: { [key in keyof Build]?: (parent: Build) => Build[key] } & {
    deployment: (
      parent: Build & DeploymentArgs,
      args: {},
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<Deployment & { teamId?: string }>
  }
  Region?: (parent: Region) => [keyof typeof Region] // more on why typeof here: https://github.com/Microsoft/TypeScript/issues/14106
  DeploymentState?: (parent: DeploymentState) => [keyof typeof DeploymentState]
  BuildOutput?: { [key in keyof BuildOutput]?: (parent: BuildOutput) => BuildOutput[key] }
  FileType?: (parent: FileType) => [keyof typeof FileType]
  BuiltLambdaInfo?: {
    [key in keyof BuiltLambdaInfo]?: (parent: BuiltLambdaInfo) => BuiltLambdaInfo[key]
  }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
