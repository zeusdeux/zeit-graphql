import { GraphQLSchema } from 'graphql'
import { delegateToSchema, makeExecutableSchema } from 'graphql-tools'
import { DeploymentResolverType } from '../types/deployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { File } from '../types/sharedTypeDefs'
import { DeploymentTypeDef } from './deployment.schema'
import { FilesInDeploymentSchema } from './filesInDeployment'

const gql = String.raw

const DeploymentResolver: DeploymentResolverType = {
  Query: {
    async deployment(_root, { deploymentId, teamId }, { dataSources }) {
      const deploymentData = await dataSources.zeitAPI.getDeployment(deploymentId, teamId)

      // threading teamId down to the child resolver
      // as it's needed by the `files` resolver when it
      // delegates to `filesInDeployment` as that requires
      // both a deploymentId as well as an optional teamId
      if (teamId) {
        return {
          ...deploymentData,
          teamId
        }
      }
      return deploymentData
    }
  },

  Deployment: {
    files(parent, _args, context, info) {
      // btw, the following thread explains why info.mergeInfo
      // was undefined here.
      // https://github.com/apollographql/apollo-server/issues/1379
      return delegateToSchema({
        operation: 'query',
        fieldName: 'filesInDeployment',
        schema: FilesInDeploymentSchema,
        args: {
          deploymentId: parent.id,
          teamId: parent.teamId
        },
        context,
        info
      }) as Promise<File[]>
    }
  }
}

export const DeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      Deployment by user or team given by deploymentId
      """
      deployment(deploymentId: ID!, teamId: ID): Deployment
    }

    ${DeploymentTypeDef}
  `,
  resolvers: DeploymentResolver
})
