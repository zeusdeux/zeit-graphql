import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { ZeitGqlContext } from './types/resolverTypes'

export class ZeitAPI extends RESTDataSource<ZeitGqlContext> {
  constructor() {
    super()
    this.baseURL = 'https://api.zeit.co/'
  }

  public async getDeployments(teamId?: string) {
    const endpoint = withTeamId(`/v3/now/deployments`, teamId)

    const { deployments } = await this.get(endpoint)
    return deployments
  }

  public getDeployment(deploymentId: string, teamId?: string) {
    const endpoint = withTeamId(`/v8/now/deployments/${deploymentId}`, teamId)

    return this.get(endpoint)
  }

  public getDeploymentFiles(deploymentId: string, teamId?: string) {
    const endpoint = withTeamId(`/v5/now/deployments/${deploymentId}/files`, teamId)

    return this.get(endpoint)
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.authToken)
  }
}

function withTeamId(endpoint: string, teamId?: string) {
  return `${endpoint}${teamId ? '?teamId=' + teamId : ''}`
}
