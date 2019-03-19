import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { BuildsInDeploymentResolverType } from '../types/buildsInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { DeploymentStateTypeDef, FileTypeEnumDef, RegionTypeDef } from './sharedTypeDefs'

const gql = String.raw

const BuildsInDeploymentResolver: BuildsInDeploymentResolverType = {
  Query: {
    buildsInDeployment(_root, { deploymentId, teamId }, { dataSources }) {
      return dataSources.zeitAPI.getDeploymentBuilds(deploymentId, teamId)
    }
  }
}

export const BuildsInDeploymentSchame: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      All the Builds attributed to a particular deployment
      """
      buildsInDeployment(deploymentId: ID!, teamId: ID): [Build]!
    }

    type Build {
      """
      The unique ID of the Build.
      """
      id: ID!

      """
      ID of the deployment the build belongs to
      """
      # See if this can be delegated to the \`deployment\` root field
      deploymentId: String!

      """
      Entry point for the build
      """
      entrypoint: String!

      """
      The Builder the Build used to generate the output.
      """
      use: String!

      """
      The region where the Build was first created, e.g. sfo1.
      """
      createdIn: Region!

      """
      The time the build was scheduled at
      """
      scheduledAt: String

      """
      Time the build was created at
      """
      createdAt: String!

      """
      The state of the deployment depending on the process of deploying, or if it is
      ready or in an error state.
      Possible values are INITIALIZING, ANALYZING, BUILDING, DEPLOYING, READY, or ERROR.
      """
      readyState: DeploymentState!

      """
      The time at which the Build state was last modified.
      """
      readyStateAt: String!

      # add support for config
      # config: <some type here>

      output: [BuildOutput]
    }

    type BuildOutput {
      """
      Type of the built file
      """
      type: FileType!

      """
      The path of files the Build is assigned to.
      """
      path: String!

      digest: String!
      mode: Int!
      size: Int!
      lambda: BuiltLambdaInfo
    }

    type BuiltLambdaInfo {
      functionName: String!
      """
      The regions where the Build Output was finally deployed to after the build step.
      Can be an empty array.
      """
      deployedTo: [Region]!
    }

    ${FileTypeEnumDef}
    ${RegionTypeDef}
    ${DeploymentStateTypeDef}
  `,
  resolvers: BuildsInDeploymentResolver
})
