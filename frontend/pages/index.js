import Page from '../layouts/main';
import Search from '../components/Search';
import withData from '../lib/withData';

export default withData(() => (
  <Page>
    <Search />
  </Page>
));
