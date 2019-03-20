import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { DeploymentsResolverType } from '../types/deployments'
import { ZeitGqlContext } from '../types/resolverTypes'
import { ReadyStateTypeDef } from './sharedTypeDefs'

const gql = String.raw

const DeploymentsResolver: DeploymentsResolverType = {
  Query: {
    deployments(_root, { teamId }, { dataSources }) {
      return dataSources.zeitAPI.getDeployments(teamId)
    }
  }
}

export const DeploymentsSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
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
      state: ReadyState!
    }

    type User {
      uid: ID!
    }

    ${ReadyStateTypeDef}
  `,
  resolvers: DeploymentsResolver
})
