import { mergeSchemas } from 'graphql-tools'
import { DeploymentResolvers, DeploymentSchema } from './deployment'
import { DeploymentsResolvers, DeploymentsSchema } from './deployments'

export const schema = mergeSchemas({
  schemas: [DeploymentsSchema, DeploymentSchema],
  resolvers: [DeploymentsResolvers, DeploymentResolvers]
})
