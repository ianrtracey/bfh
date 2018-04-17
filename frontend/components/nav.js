import Link from 'next/link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withAuth } from './AuthProvider';
import styled from 'styled-components';

const Nav = ({ data: { loading, error, user } }) => (
  <nav className="db dt-l fw5 w-100 bg-black-90 border-box pa3 ph5-l">
    <Link style={{ 'text-decoration': 'none' }} href="/" title="Home">
      <a className="db dtc-l fw5 v-mid white-90 link dim w-100 w-25-l tc tl-l mb2 mb0-l">
        Bands From Here
      </a>
    </Link>
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <a
        className="link dim white-90 f6 f5-l dib mr3 mr4-l"
        href="#"
        title="Home"
      >
        Home
      </a>
      <a
        className="link dim white-90 f6 f5-l dib mr3 mr4-l"
        href="#"
        title="How it Works"
      >
        How it Works
      </a>
      <a
        className="link dim white-90 f6 f5-l dib mr3 mr4-l"
        href="#"
        title="Blog"
      >
        Blog
      </a>
      <a
        className="link dim white-90 f6 f5-l dib mr3 mr4-l"
        href="#"
        title="Press"
      >
        Press
      </a>
      <a className="link dim white-90 f6 f5-l dib" href="#" title="Contact">
        Contact
      </a>
    </div>
  </nav>
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
