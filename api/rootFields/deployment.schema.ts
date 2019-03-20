import {
  DeploymentStateTypeDef,
  FileTypeDef,
  HttpMethodTypeDef,
  RegionTypeDef
} from './sharedTypeDefs'

const gql = String.raw

const TargetEnvTypeDef = gql`
  enum TargetEnv {
    staging
    production
  }
`

const SuccinctBuildTypeDef = gql`
  type SuccinctBuild {
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

export const DeploymentTypeDef = gql`
  type Deployment {
    id: ID!
    url: String
    name: String!
    # meta: <> Need to figure out how to describe the type of meta as it's user controlled
    version: Int!
    regions: [Region]!
    routes: [Route]
    builds: [SuccinctBuild]!
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
    files: [File]
  }

  ${FileTypeDef}
  ${LambdaTypeDef}
  ${TargetEnvTypeDef}
  ${DeploymentStateTypeDef}
  ${SuccinctBuildTypeDef}
  ${RouteTypeDef}
  ${RegionTypeDef}
`
