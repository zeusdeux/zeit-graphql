import { DeploymentTypeDef } from './deployment.schema'

const gql = String.raw

export const BuildsInDeploymentTypeDef = gql`
  type Build {
    """
    The unique ID of the Build.
    """
    id: ID!

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
    readyState: ReadyState!

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

  ${DeploymentTypeDef}
`
