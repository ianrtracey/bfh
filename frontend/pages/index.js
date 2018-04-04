import Link from 'next/link';
import Page from '../layouts/main';
import Login from '../components/Login';
import Search from '../components/Search';
import Player from '../components/Player';

import { AuthProvider } from '../components/AuthProvider';
import { SpotifySDKProvider } from '../components/SpotifySDKProvider';
import withData from '../lib/withData';

export default withData(() => (
  // <AuthProvider>
  // <SpotifySDKProvider>
  <Page>
    <Search />
    {/* <Player /> */}
  </Page>
  // </SpotifySDKProvider>
  // </AuthProvider>
));
