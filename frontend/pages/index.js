import Link from 'next/link';
import Page from '../layouts/main';
import Login from '../components/Login';
import Search from '../components/Search';

import { AuthProvider } from '../components/AuthProvider';
import { SpotifySDKProvider } from '../components/SpotifySDKProvider';
import withData from '../lib/withData';

export default withData(() => (
  // <AuthProvider>
  // <SpotifySDKProvider>
  <Page>
    <Search />
  </Page>
  // </SpotifySDKProvider>
  // </AuthProvider>
));
