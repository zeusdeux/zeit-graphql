import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { DeploymentArgs } from '../types/deployment'
import { FilesInDeploymentResolverType } from '../types/filesInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { FileTypeDef } from './sharedTypeDefs'

const gql = String.raw

const FilesInDeploymentResolver: FilesInDeploymentResolverType = {
  Query: {
    filesInDeployment(
      _obj: any,
      { deploymentId, teamId }: DeploymentArgs,
      { dataSources }: ZeitGqlContext
    ) {
      return dataSources.zeitAPI.getDeploymentFiles(deploymentId, teamId)
    }
  }
}

export const FilesInDeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      Files that make up a deployment
      """
      filesInDeployment(deploymentId: ID!, teamId: ID): [File]
    }

    ${FileTypeDef}
  `,
  resolvers: FilesInDeploymentResolver
})
