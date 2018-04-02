import Link from 'next/link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withAuth } from './AuthProvider';
import Login from './Login';
import styled from 'styled-components';

const Navigation = styled.div`
  display: flex;
  width: 100%
  margin-top: 2em;
`;
const Nav = ({ data: { loading, error, user } }) => (
  <Navigation>
    <div>
      <h1>Bands from Here</h1>
    </div>
    <div>
      <p> Api</p>
      <p> About</p>
      <Login />
    </div>
  </Navigation>
);

export const getUser = gql`
  query getUser {
    user {
      displayName
      email
      imageUrl
    }
  }
`;

export default graphql(getUser)(Nav);
