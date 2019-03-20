import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-tools'
import { BuildsInDeploymentSchema } from './rootFields/buildsInDeployment'
import { DeploymentSchema } from './rootFields/deployment'
import { DeploymentsSchema } from './rootFields/deployments'
import { FileInDeploymentSchema } from './rootFields/fileInDeployment'
import { FilesInDeploymentSchema } from './rootFields/filesInDeployment'

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [
    DeploymentsSchema,
    DeploymentSchema,
    FilesInDeploymentSchema,
    FileInDeploymentSchema,
    BuildsInDeploymentSchema
  ],
  onTypeConflict: l => l
})
