import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { FileInDeploymentResolverType } from '../types/fileInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'

const gql = String.raw

const FileInDeploymentResolver: FileInDeploymentResolverType = {
  Query: {
    fileInDeployment(_parent, { deploymentId, fileId, teamId }, { dataSources }) {
      return dataSources.zeitAPI.getDeploymentFile(deploymentId, fileId, teamId)
    }
  }
}

export const FileInDeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      Raw content for a file in a deployment
      """
      fileInDeployment(deploymentId: ID!, fileId: ID!, teamId: ID): String!
    }
  `,
  resolvers: FileInDeploymentResolver
})
