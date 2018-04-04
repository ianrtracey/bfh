import Link from 'next/link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withAuth } from './AuthProvider';
import Login from './Login';
import styled from 'styled-components';

const Navigation = styled.div``;
const Nav = ({ data: { loading, error, user } }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      Bands From Here
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor02"
      aria-controls="navbarColor02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About
          </a>
        </li>
      </ul>
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
