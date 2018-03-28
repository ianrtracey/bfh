import fetch from 'node-fetch';
import playlistData from '../playlists.json';
const authToken =
  'BQDS-4YvYaYxWoZLJLMbbCIA6odRqqZHyVLdwCaX7iPB-phuT530OdU3L8Bn6hT8c8zhnzPIj5N-7zUWjvHdiImlWVKaZNq2A6CJmwNBxiKECwb6n3uA3RvqZ5i0UfZh3pdDs7nk4O9jOeSTo66Igk51c3mJcHFbrgpdSLhfi0jCF9xV_Sa6';
export const resolvers = {
  Query: {
    user: async request => {
      const res = await get('https://api.spotify.com/v1/me');
      const user = await res.json();
      console.log(user);
      return {
        uri: user.uri,
        displayName: user.display_name,
        email: user.email,
        imageUrl: user.images[0].url,
      };
    },
    playing: async request => {
      const res = await get(
        'https://api.spotify.com/v1/me/player/currently-playing'
      );
      if (!res.ok) {
        console.error('Error:', res.status, res.statusText);
        return null;
      }
      const track = await res.json();
      console.log(track);
      return {
        uri: track.context.uri,
        name: track.item.name,
        link: track.context.external_urls.spotify,
        coverPhoto: track.item.album.images[0],
        artists: track.item.artists.map(artist => ({
          name: artist.name,
          uri: artist.uri,
        })),
      };
    },
    playlists: async (root, { query }) => {
      const playlists = playlistData.filter(d =>
        `${d.city}${d.state}`.toLowerCase().includes(query.toLowerCase())
      );

      return playlists;
    },
  },
  Mutation: {
    play: async (root, { spotifyUri }) => {
      console.log(spotifyUri);
      const res = await put('https://api.spotify.com/v1/me/player/play', {
        context_uri: spotifyUri,
      });
      if (!res.ok) {
        console.error('err', res.status, res.statusText);
        return {
          status: 'error',
        };
      }
      return {
        status: 'playing',
      };
    },
  },
};

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${authToken}`,
};

const get = async url => await fetch(url, { headers });
const put = async (url, data) =>
  await fetch(url, {
    headers,
    body: JSON.stringify(data),
    method: 'PUT',
  });
