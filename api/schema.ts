import { makeExecutableSchema } from 'graphql-tools'

// having this here lets prettier format the tagged
// template literal below
const gql = String.raw
export const typeDefs = gql`
  type Query {
    """
    List of deployments by user or team id
    """
    deployments(
      """
      ID of a team the user given by the auth token
      is a member of.
      """
      teamId: ID
    ): [Deployment]
  }

  type Deployment {
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

  enum DeploymentState {
    INITIALIZING
    ANALYZING
    BUILDING
    DEPLOYING
    READY
    ERROR
  }
`

export const resolvers = {
  Query: {
    deployments: (_obj: any, { teamId }: any, { dataSources }: any) => {
      return dataSources.zeitAPI.getDeployments(teamId)
    }
  }
  // Deployment resolver is trivial as it only
  // picks off properties for each Deployment object
  // and hence can be skipped here.
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})
