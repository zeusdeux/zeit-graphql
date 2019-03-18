import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { ZeitAPI } from './zeitHttpDataSource'

function enableIntrospectionInProd(): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true
  }

  return process.env.ENABLE_INTROSPECTION === 'true' ? true : false
}

const server = new ApolloServer({
  introspection: enableIntrospectionInProd(),
  schema,
  context: ({ req }) => ({
    authToken: req.headers.authorization ? req.headers.authorization.trim() : ''
  }),
  dataSources: () => ({
    zeitAPI: new ZeitAPI()
  }),
  formatError: error => {
    // tslint:disable-next-line:no-console
    console.error(error)

    if (error.extensions) {
      delete error.extensions.exception

      if (error.extensions.response) {
        const errorBody = error.extensions.response.body

        delete error.extensions.response.body
        return {
          ...errorBody,
          ...error.extensions.response,
          path: error.path,
          locations: error.locations
        }
      }
    }

    return error
  }
})

server.listen().then(({ url }: { url: string }) => {
  // tslint:disable-next-line:no-console
  console.log(`Schema introspection ${enableIntrospectionInProd() ? 'enabled' : 'disabled'}`)
  // tslint:disable-next-line:no-console
  console.log(`Server ready at ${url}`)
})
