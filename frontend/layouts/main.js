import Head from '../components/head';
import Nav from '../components/Nav';
import styled from 'styled-components';

const AppWrapper = styled.div``;

export default ({ children }) => (
  <AppWrapper>
    <Head title="Home" />
    <Nav />
    {children}
  </AppWrapper>
);
