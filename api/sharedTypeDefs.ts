const gql = String.raw

export const DeploymentStateTypeDef = gql`
  enum DeploymentState {
    INITIALIZING
    ANALYZING
    BUILDING
    DEPLOYING
    READY
    ERROR
  }
`

export const RegionTypeDef = `
    enum Region {
      bru1
      gru1
      hnd1
      iad1
      sfo1
    }
  `

export const HttpMethodTypeDef = gql`
  enum HttpMethod {
    GET
    HEAD
    POST
    PUT
    DELETE
    CONNECT
    OPTIONS
    TRACE
    PATCH
  }
`
