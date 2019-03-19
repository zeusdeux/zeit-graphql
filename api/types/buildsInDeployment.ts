import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { DeploymentArgs } from './deployment'
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
  deploymentId: string
  entrypoint: string
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
    ) => Promise<Build[]>
  }

  // trivial resolvers and hence optional
  Build?: { [key in keyof Build]?: (parent: Build) => Build[key] }
  Region?: (parent: Region) => [keyof typeof Region] // more on why typeof here: https://github.com/Microsoft/TypeScript/issues/14106
  DeploymentState?: (parent: DeploymentState) => [keyof typeof DeploymentState]
  BuildOutput?: { [key in keyof BuildOutput]?: (parent: BuildOutput) => BuildOutput[key] }
  BuiltLambdaInfo?: {
    [key in keyof BuiltLambdaInfo]?: (parent: BuiltLambdaInfo) => BuiltLambdaInfo[key]
  }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
