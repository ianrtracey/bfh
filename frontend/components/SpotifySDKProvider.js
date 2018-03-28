import { Component } from 'react';
import { withAuth } from './AuthProvider';

export const spotifyContextTypes = {};

class SpotifySDKProviderImpl extends Component {
  player = null;

  componentDidMount() {
    const token =
      'BQALpXndYiZ8TtjiaBJEzXmAx0uUbmJ_O5Gh8EUylyPU6fw7ODdMI91ZhzUdhVriu4jPdc08hSBgSQpP_On5wt83J27STT_n9Et0TdNAX7uzt6hapIsidMaXjrMA0PO7I1XupUnznbg70DX5l5OSLyVYGX2fr7ti45xK';
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'Bands From Here Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', state => {
        console.log(state);
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Connect to the player!
      this.player.connect();
    };
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}

export const SpotifySDKProvider = withAuth(SpotifySDKProviderImpl);

export const withSpotify = WrapperComponent => {
  const wrapper = props => <WrappedComponent {...props} />;

  Wrapper.contextTypes = spotifyContextTypes;

  return Wrapper;
};
