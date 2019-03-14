import { ApolloServer, gql } from 'apollo-server'
import { resolvers, typeDefs } from './schema'
import { ZeitAPI } from './zeitHttpDataSource'

const server = new ApolloServer({
  resolvers,
  typeDefs: gql`
    ${typeDefs}
  `,
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
