import Head from "./head";
import Link from "next/link";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withAuth } from "./AuthProvider";

const links = [
  { href: "https://github.com/segmentio/create-next-app", label: "Github" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = ({ data: { loading, error, user } }) => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Bands from Here</a>
        </Link>
      </li>
      <ul>
        <li>
          <Link>
            <a>{!loading && !error ? user.email : 'Login'}</a>
          </Link>
        </li>
      </ul>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
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
`

export default graphql(getUser)(Nav);
