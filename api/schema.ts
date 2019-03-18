import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import { DeploymentSchema } from './rootFields/deployment'
import { DeploymentsSchema } from './rootFields/deployments'
import { FilesInDeploymentSchema } from './rootFields/filesInDeployment'

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [DeploymentsSchema, DeploymentSchema, FilesInDeploymentSchema]
})
