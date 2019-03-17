import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { ZeitAPI } from './zeitHttpDataSource'

function enableIntrospectionInProd() {
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
  })
})

server.listen().then(({ url }: { url: string }) => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at ${url}`)
})
