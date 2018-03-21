var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const fetch = require('node-fetch');
const cors = require('cors');

const authToken = "BQB8aiZHLSi5sFdO3h-8zlZWu8X1x3xH4kwrsccOQup2Rr4XuDsmR9M-P0IBZa-oF9GCnzQ0awetfOCiiZaooWqWt1P8R2uiZdl89g6Gg3XiAABJEQ628hmrruGQjbmRqULW8eIwq0vm09PwmZE"

// GraphQL schema
var schema = buildSchema(`
type Query {
  user: User
}

type User {
  displayName: String
  email: String
  imageUrl: String
}
`);

const get = async (url) => (
  await fetch(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
)
// Root resolver
var root = {
  user: async (request) => {
    const res = await get('https://api.spotify.com/v1/me')
    const user = await res.json()
    return {
      displayName: user.display_name,
      email: user.email,
      imageUrl: user.images[0].url,
    }

  }
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
