import Head from '../components/head';
import Nav from '../components/Nav';
import styled from 'styled-components';

const AppWrapper = styled.div``;

export default ({ children }) => (
  <div className="w-100 bg-black-100">
    <Head title="Home" />
    <Nav />
    {children}
  </div>
);
