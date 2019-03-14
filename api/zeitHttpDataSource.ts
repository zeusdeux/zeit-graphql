import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

export class ZeitAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.zeit.co/'
  }

  public async getDeployments(teamId?: string) {
    const endpoint = '/v3/now/deployments'

    if (teamId) {
      return this.get(`${endpoint}?teamId=${teamId}`)
    }

    return this.get(endpoint).then(v => v.deployments)
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.authToken)
  }
}
