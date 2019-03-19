export enum DeploymentState {
  INITIALIZING = 'INITIALIZING',
  ANALYZING = 'ANALYZING',
  BUILDING = 'BUILDING',
  DEPLOYING = 'DEPLOYING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export enum Region {
  bru1 = 'bru1',
  gru1 = 'gru1',
  hnd1 = 'hnd1',
  iad1 = 'iad1',
  sfo1 = 'sfo1'
}

export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH'
}

export interface File {
  uid?: string
  name: string
  type: FileType
  mode: number
  children?: File[]
}

export enum FileType {
  file = 'file',
  directory = 'directory',
  lambda = 'lambda'
}
