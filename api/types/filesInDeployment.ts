import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import { DeploymentArgs } from './deployment'
import { ZeitGqlContext } from './resolverTypes'
import { File } from './sharedTypeDefs'

export interface FilesInDeploymentResolverType {
  Query: {
    filesInDeployment: (
      parent: {},
      args: DeploymentArgs,
      ctx: ZeitGqlContext,
      info: IGraphQLToolsResolveInfo
    ) => Promise<File[]>
  }

  // this is a trivial resolver hence optional
  File?: { [P in keyof File]?: (parent: File) => File[P] }

  // For compatibility with IExecutableSchemaDefinition.resolvers which is the type of
  // the resolvers option passed to makeExecutableSchema
  [key: string]: any
}
