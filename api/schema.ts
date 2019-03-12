import { makeExecutableSchema } from 'graphql-tools'

// having this here lets prettier format the tagged
// template literal below
const gql = String.raw
const typeDef = gql`
  type Query {
    deployments: [Deployment]
  }

  type Deployment {
    uid: ID!
    name: String!
    url: String
    # create: Map<ID, User>,
    state: DeploymentState
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

const resolvers = {
  Query: {
    deployments: {}
  }
}
