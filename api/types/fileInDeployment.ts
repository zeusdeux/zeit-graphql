import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { DeploymentArgs } from './deployment'
import { ZeitGqlContext } from './resolverTypes'

interface FileInDeploymentArgs extends DeploymentArgs {
  fileId: string
}

export interface FileInDeploymentResolverType {
  Query: {
    fileInDeployment: (
      parent: {},
      args: FileInDeploymentArgs,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<string>
  }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
