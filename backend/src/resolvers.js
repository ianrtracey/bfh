import fetch from 'node-fetch';
import playlistData from '../playlists.json';
import { withFilter } from 'graphql-yoga';
import { PlaylistDb } from './playlistDb';

const authToken =
  'BQCzAQFNvpzEBIdWTrMyk3_7jDn3stLtQJyEPaMzets6I2UfrC_C3vDOCjmxpctavgk3856fT0Wx8qKOHDpndxipLqY5GPekQP2zglqQ6iA8OQCD6-Ez36uQDWLvPvDoyQp6CPNalMJEiUzeq79nJN7S5Zsfcfe7yyJ01pl_ZVYSAwyBm6Fg';

const TRACK_CHANGED_CHANNEL = 'TRACK_CHANGED';
const playlistDb = new PlaylistDb();

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
      const data = playlistDb.getPlaylists({ query })
      console.log(data);
      return data
    },
  },
  Mutation: {
    play: async (root, { spotifyUri }, { pubsub }) => {
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
  Subscription: {
    playingTrackChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(TRACK_CHANGED_CHANNEL),
        (parent, args, { pubsub }) => {
          const channel = getRandomChannelName();
          setInterval(() => pubsub.publish(channel, { playing }), 2000)
          return pubsub.asyncIterator(channel)
        }),
    }
  }
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
