import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

export class ZeitAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.zeit.co/'
  }

  public async getDeployments(teamId?: string) {
    const endpoint = `/v3/now/deployments${teamId ? '?teamId=' + teamId : ''}`

    const { deployments } = await this.get(endpoint)
    return deployments
  }

  public getDeployment(deploymentId: string) {
    const endpoint = `/v8/now/deployments/${deploymentId}`

    return this.get(endpoint)
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.authToken)
  }
}
