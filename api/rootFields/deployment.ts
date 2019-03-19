import { GraphQLSchema } from 'graphql'
import { delegateToSchema, makeExecutableSchema } from 'graphql-tools'
import { DeploymentResolverType } from '../types/deployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { File } from '../types/sharedTypeDefs'
import { FilesInDeploymentSchema } from './filesInDeployment'
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

const DeploymentResolver: DeploymentResolverType = {
  Query: {
    async deployment(_root, { deploymentId, teamId }, { dataSources }) {
      const deploymentData = await dataSources.zeitAPI.getDeployment(deploymentId, teamId)

      // threading teamId down to the child resolver
      // as it's needed by the `files` resolver when it
      // delegates to `filesInDeployment` as that requires
      // both a deploymentId as well as an optional teamId
      if (teamId) {
        return {
          ...deploymentData,
          teamId
        }
      }
      return deploymentData
    }
  },

  Deployment: {
    files(parent, _args, context, info) {
      // btw, the following thread explains why info.mergeInfo
      // was undefined here.
      // https://github.com/apollographql/apollo-server/issues/1379
      return delegateToSchema({
        operation: 'query',
        fieldName: 'filesInDeployment',
        schema: FilesInDeploymentSchema,
        args: {
          deploymentId: parent.id,
          teamId: parent.teamId
        },
        context,
        info
      }) as Promise<File[]>
    }
  }
}

export const DeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
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
  `,
  resolvers: DeploymentResolver
})
