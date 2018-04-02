export class PlaylistDb {
  constructor({ path = null } = {}) {
    this.path = '../playlists.json';
    this.playlistData = require(this.path);
  }

  getPlaylists({ query }) {
    return this.playlistData
      .filter(playlist => (
        `${playlist.city} ${playlist.state} ${playlist.country}`.toLowerCase().includes(query.toLowerCase())
      ))
  }
}