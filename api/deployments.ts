import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { Args, ZeitGqlDataSources } from './resolverTypes'
import { DeploymentStateTypeDef } from './sharedTypeDefs'

const gql = String.raw

export const DeploymentsSchema = mergeSchemas({
  schemas: [
    makeExecutableSchema({
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
      `
    }),
    DeploymentStateTypeDef
  ]
})

export const DeploymentsResolvers = {
  Query: {
    deployments(_obj: any, { teamId }: Args, { dataSources }: ZeitGqlDataSources) {
      return dataSources.zeitAPI.getDeployments(teamId)
    }
  }
}
