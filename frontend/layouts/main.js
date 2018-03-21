import Head from '../components/head';
import Nav from '../components/nav';

export default ({ children }) => (
  <div>
    <Head title="Home" />
    <Nav />
    {children}
  </div>
)