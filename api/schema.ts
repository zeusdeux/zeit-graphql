import { makeExecutableSchema } from 'graphql-tools'
import { ZeitAPI } from './zeitHttpDataSource'

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
    ): [SuccintDeployment]

    deployment(deploymentId: ID!): Deployment
  }

  type Deployment {
    id: ID!
    url: String
    name: String!
    # meta: <> Need to figure out how to describe the type of meta as it's user controlled
    version: Int!
    regions: [Region]
    routes: [Route]
    builds: [Build]
    plan: String!
    public: Boolean!
    ownerId: ID!
    readyState: DeploymentState
    createdAt: Int!
    createdIn: Region
    # env: <> Same problem as meta. It's user defined. Figure this out.
    # build: BuildEnv
    target: TargetEnv
    aliasFinal: [String]
  }

  enum TargetEnv {
    staging
    production
  }

  # type BuildEnv {
  # env: <> Dynamic and user defined. Figure this out.
  # }

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

  type Build {
    src: String!
    use: String!
  }

  type Route {
    src: String!
    dest: String
    # headers: figure out a smart way to support all http headers here
    status: Int
    methods: [HttpMethod]
  }

  enum Region {
    bru1
    gru1
    hnd1
    iad1
    sfo1
  }

  enum HttpMethod {
    GET
    HEAD
    POST
    PUT
    DELETE
    CONNECT
    OPTIONS
    TRACE
    PATCH
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
    // TODO: Add types to all the any types here
    deployments(_obj: any, { teamId }: any, { dataSources }: any) {
      return dataSources.zeitAPI.getDeployments(teamId)
    },

    deployment(
      _obj: any,
      { deploymentId }: any,
      { dataSources }: { dataSources: { zeitAPI: ZeitAPI } }
    ) {
      return dataSources.zeitAPI.getDeployment(deploymentId)
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
