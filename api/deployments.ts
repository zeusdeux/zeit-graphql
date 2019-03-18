import { makeExecutableSchema } from 'graphql-tools'
import { DeploymentStateTypeDef } from './sharedTypeDefs'
import { Args, ZeitGqlContext } from './types/resolverTypes'

const gql = String.raw

const DeploymentsResolver = {
  Query: {
    deployments(_obj: any, { teamId }: Args, { dataSources }: ZeitGqlContext) {
      return dataSources.zeitAPI.getDeployments(teamId)
    }
  }
}

export const DeploymentsSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      """
      List of deployments by user or team
      """
      deployments(
        """
        ID of a team the user given by the auth token
        is a member of.
        """
        teamId: ID
      ): [SuccintDeployment]
    }

    type SuccintDeployment {
      uid: ID!
      name: String!
      url: String
      created: String!
      creator: User!
      state: DeploymentState!
    }

    type User {
      uid: ID!
    }

    ${DeploymentStateTypeDef}
  `,
  resolvers: DeploymentsResolver
})
