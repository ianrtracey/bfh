import { GraphQLServer, PubSub } from 'graphql-yoga';
import { typeDefs, resolvers } from './src';


const pubsub = new PubSub();
const server = new GraphQLServer(
  {
    typeDefs,
    resolvers,
    context: { pubsub },
  });
server.start(() => console.log('GraphQL server is running on localhost:4000'));