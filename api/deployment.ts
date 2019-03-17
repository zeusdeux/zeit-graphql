import { makeExecutableSchema } from 'graphql-tools'
import { Args, ZeitGqlDataSources } from './resolverTypes'
import { DeploymentStateTypeDef, HttpMethodTypeDef, RegionTypeDef } from './sharedTypeDefs'

const gql = String.raw

const TargetEnvTypeDef = gql`
  enum TargetEnv {
    staging
    production
  }
`

const BuildTypeDef = gql`
  type Build {
    src: String!
    use: String!
  }
`

const RouteTypeDef = gql`
  type Route {
    src: String!
    dest: String
    # headers: figure out a smart way to support all http headers here
    status: Int
    methods: [HttpMethod]
  }

  ${HttpMethodTypeDef}
`

const LambdaTypeDef = gql`
  type Lambda {
    id: ID!
    entrypoint: String!
    readyState: DeploymentState!
    readyStateAt: String!
    createdAt: String!
    output: [LambdaOutput]
  }

  type LambdaOutput {
    path: String
    functionName: String
  }
`

export const DeploymentSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      """
      Deployment by user or team given by deploymentId
      """
      deployment(deploymentId: ID!, teamId: ID): Deployment
    }

    type Deployment {
      id: ID!
      url: String
      name: String!
      # meta: <> Need to figure out how to describe the type of meta as it's user controlled
      version: Int!
      regions: [Region]!
      routes: [Route]
      builds: [Build]!
      plan: String!
      public: Boolean!
      ownerId: ID!
      readyState: DeploymentState!
      createdAt: String!
      createdIn: Region!
      # env: <> Same problem as meta. It's user defined. Figure this out.
      # build: BuildEnv
      target: TargetEnv
      aliasFinal: [String]
      lambdas: [Lambda]
    }

    ${LambdaTypeDef}
    ${TargetEnvTypeDef}
    ${DeploymentStateTypeDef}
    ${BuildTypeDef}
    ${RouteTypeDef}
    ${RegionTypeDef}
  `
})

interface DeploymentArgs extends Args {
  deploymentId: string
}

export const DeploymentResolvers = {
  Query: {
    deployment(
      _obj: any,
      { deploymentId, teamId }: DeploymentArgs,
      { dataSources }: ZeitGqlDataSources
    ) {
      return dataSources.zeitAPI.getDeployment(deploymentId, teamId)
    }
  }
  // Deployment resolver is trivial as it only
  // picks off properties for each Deployment object
  // and hence can be skipped here.
}
