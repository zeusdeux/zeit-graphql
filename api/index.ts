import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { ZeitAPI } from './zeitHttpDataSource'

const server = new ApolloServer({
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
