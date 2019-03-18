import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { DeploymentArgs } from './deployment'
import { ZeitGqlContext } from './resolverTypes'
import { File } from './sharedTypeDefs'

interface ExtraFieldsForFileRawContentDelegation {
  deploymentId: string
  fileId: string
  teamId?: string
}

interface FilesInDeploymentArgs extends DeploymentArgs {
  fileId?: string
}

export interface FilesInDeploymentResolverType {
  Query: {
    filesInDeployment: (
      parent: {},
      args: FilesInDeploymentArgs,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<File[]>
  }

  // this is a trivial resolver hence optional
  File?: {
    [P in keyof File]?: (parent: File & ExtraFieldsForFileRawContentDelegation) => File[P]
  } & {
    rawContent: (
      parent: File & ExtraFieldsForFileRawContentDelegation,
      args: {},
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<string> | null
  }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
