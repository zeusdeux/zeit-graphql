const gql = String.raw

export const ReadyStateTypeDef = gql`
  enum ReadyState {
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

export const FileTypeEnumDef = gql`
  enum FileType {
    file
    directory
    lambda
  }
`

export const FileTypeDef = gql`
  type File {
    uid: ID
    name: String!
    type: FileType!
    mode: Int!
    rawContent: String
    children: [File]
  }

  ${FileTypeEnumDef}
`
