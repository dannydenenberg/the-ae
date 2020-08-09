import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'

/** Start Apollo Server */
const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
