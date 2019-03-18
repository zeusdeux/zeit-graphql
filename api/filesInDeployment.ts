import { makeExecutableSchema } from 'graphql-tools'
import { DeploymentArgs } from './deployment'
import { FileTypeDef } from './sharedTypeDefs'
import { ZeitGqlContext } from './types/resolverTypes'

const gql = String.raw

const FilesInDeploymentResolver = {
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

export const FilesInDeploymentSchema = makeExecutableSchema({
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
