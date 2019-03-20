import { GraphQLSchema } from 'graphql'
import { delegateToSchema, makeExecutableSchema } from 'graphql-tools'
import { BuildsInDeploymentResolverType } from '../types/buildsInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { BuildsInDeploymentTypeDef } from './buildsInDeployment.schema'
import { DeploymentSchema } from './deployment'

const gql = String.raw

const BuildsInDeploymentResolver: BuildsInDeploymentResolverType = {
  Query: {
    async buildsInDeployment(_root, { deploymentId, teamId }, { dataSources }) {
      const builds = await dataSources.zeitAPI.getDeploymentBuilds(deploymentId, teamId)

      return builds.map(build => ({
        ...build,
        teamId // deploymentId is already contained in the response for builds
      }))
    }
  },

  Build: {
    deployment(parent, _args, context, info) {
      return delegateToSchema({
        operation: 'query',
        fieldName: 'deployment',
        schema: DeploymentSchema,
        args: {
          deploymentId: parent.deploymentId,
          teamId: parent.teamId
        },
        context,
        info
      })
    }
  }
}

export const BuildsInDeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      All the Builds attributed to a particular deployment
      """
      buildsInDeployment(deploymentId: ID!, teamId: ID): [Build]!
    }

    extend type Build {
      """
      Deployment this build belongs to
      """
      deployment: Deployment!
    }

    ${BuildsInDeploymentTypeDef}
  `,
  resolvers: BuildsInDeploymentResolver
})
