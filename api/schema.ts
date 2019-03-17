import { mergeSchemas } from 'graphql-tools'
import { DeploymentSchema } from './deployment'
import { DeploymentsSchema } from './deployments'
import { FilesInDeploymentSchema } from './filesInDeployment'

export const schema = mergeSchemas({
  schemas: [DeploymentsSchema, DeploymentSchema, FilesInDeploymentSchema]
})
