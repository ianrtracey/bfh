import { Component } from "react";
import { withAuth } from './AuthProvider';

export const spotifyContextTypes = {

};

class SpotifySDKProviderImpl extends Component {

  player = null;

  componentDidMount() {
    console.log('context: ', this.props.getAuthToken())
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Bands From Here Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      this.player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Connect to the player!
      this.player.connect();
    }
  }

  render() {
    return <span>{this.props.children}</span>
  }
}

export const SpotifySDKProvider = withAuth(SpotifySDKProviderImpl)

export const withSpotify = WrapperComponent => {
  const wrapper = (props) => (
    <WrappedComponent {...props} />
  );

  Wrapper.contextTypes = spotifyContextTypes

  return Wrapper;
}