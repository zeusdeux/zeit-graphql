import { FileTypeDef, HttpMethodTypeDef, ReadyStateTypeDef, RegionTypeDef } from './sharedTypeDefs'

const gql = String.raw

const TargetEnvTypeDef = gql`
  enum TargetEnv {
    staging
    production
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

export const DeploymentTypeDef = gql`
  type Deployment {
    id: ID!
    url: String
    name: String!
    # meta: <> Need to figure out how to describe the type of meta as it's user controlled
    version: Int!
    regions: [Region]!
    routes: [Route]
    plan: String!
    public: Boolean!
    ownerId: ID!
    readyState: ReadyState!
    createdAt: String!
    createdIn: Region!
    # env: <> Same problem as meta. It's user defined. Figure this out.
    # build: BuildEnv
    target: TargetEnv
    aliasFinal: [String]

    # Custom objects in the graph connected below using delegateToSchema
    # This gets files in the current deployment
    files: [File]
    # this is available in buildsInDeployment.schema.ts as that's a superset of this typedef
    builds: [Build]!
  }

  ${FileTypeDef}
  ${TargetEnvTypeDef}
  ${ReadyStateTypeDef}
  ${RouteTypeDef}
  ${RegionTypeDef}
`
