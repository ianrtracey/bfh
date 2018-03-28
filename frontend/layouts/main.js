import Head from '../components/head';
import Nav from '../components/Nav';
import styled from 'styled-components';

export default ({ children }) => (
  <div>
    <Head title="Home" />
    <Nav />
    {children}
  </div>
);
