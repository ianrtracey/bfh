import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type User {
  uri: String
  displayName: String
  email: String
  imageUrl: String
}

type Player {
  status: String!
}

type Playlist {
  city: String!
  state: String!
  country: String!
  playlistUri: String!
}

type Query {
  user: User
  playing: Track
  playlists(query: String!): [Playlist]
}

type Artist {
  uri: String!
  name: String!
}

type Track {
  uri: String!
  name: String!
  link: String!
  coverPhoto: String!
  artists: [Artist]
}

type Mutation {
  play(spotifyUri: String!): Player
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
