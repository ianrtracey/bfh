export const typeDefs = `

type Query {
  user: User
  playlists(query: String!): [Playlist]
  playing: Track
}

type Mutation {
  play(spotifyUri: String!): Player
}

type Subscription {
  playingTrackChanged: Track
}


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
  id: String!
  city: String!
  state: String!
  country: String!
  playlistUri: String!
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
`;
