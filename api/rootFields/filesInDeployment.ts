import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { FilesInDeploymentResolverType } from '../types/filesInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { FileTypeDef } from './sharedTypeDefs'

const gql = String.raw

const FilesInDeploymentResolver: FilesInDeploymentResolverType = {
  Query: {
    filesInDeployment(_root, { deploymentId, teamId }, { dataSources }) {
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
