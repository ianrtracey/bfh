import Head from '../components/head';
import Nav from '../components/Nav';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


export default ({ children }) => (
  <AppWrapper>
    <Head title="Home" />
    <Nav />
    {children}
  </AppWrapper>
);
