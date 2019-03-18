import { GraphQLSchema } from 'graphql'
import { delegateToSchema, makeExecutableSchema } from 'graphql-tools'
import { FilesInDeploymentResolverType } from '../types/filesInDeployment'
import { ZeitGqlContext } from '../types/resolverTypes'
import { FileInDeploymentSchema } from './fileInDeployment'
import { FileTypeDef } from './sharedTypeDefs'

const gql = String.raw

const FilesInDeploymentResolver: FilesInDeploymentResolverType = {
  Query: {
    async filesInDeployment(_root, { deploymentId, teamId }, { dataSources }) {
      const files = await dataSources.zeitAPI.getDeploymentFiles(deploymentId, teamId)

      return files.map(file => ({
        ...file,
        deploymentId,
        teamId
      }))
    }
  },

  File: {
    children: parent => {
      if (parent && parent.children) {
        // adding the deploymentId, etc here as children is of type File[]
        // therefore, it's recursive which means we want to be able to fetch rawContent
        // on it and to do so, we must pass the args needed by "fileInDeployment" schema
        // by adding it to each file object here
        return parent.children.map(file => ({
          ...file,
          deploymentId: parent.deploymentId,
          teamId: parent.teamId
        }))
      }
      return undefined
    },

    rawContent(parent, _args, context, info) {
      if (!parent.uid) {
        return null
      }

      return delegateToSchema({
        operation: 'query',
        fieldName: 'fileInDeployment',
        schema: FileInDeploymentSchema,
        args: {
          deploymentId: parent.deploymentId,
          fileId: parent.uid,
          teamId: parent.teamId
        },
        context,
        info
      }) as Promise<string>
    }
  }
}

export const FilesInDeploymentSchema: GraphQLSchema = makeExecutableSchema<ZeitGqlContext>({
  typeDefs: gql`
    type Query {
      """
      Files that make up a deployment
      """
      filesInDeployment(deploymentId: ID!, teamId: ID): [File]
    }

    ${FileTypeDef}
  `,
  resolvers: FilesInDeploymentResolver
})
