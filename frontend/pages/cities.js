import Page from '../layouts/main';
import withData from '../lib/withData';
import CityPlaylist from '../components/CityPlaylist';

export default withData(({ url }) => (
  <CityPlaylist playlistId={url.query.playlistId} />
));
