import Page from '../layouts/main';
import styled from 'styled-components';
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Router from 'next/router';

const Wrapper = styled.div`
  margin-top: 5%;
`;

const SpotifyButton = styled.div`
  color: #fff;
  cursor: pointer;
  margin-bottom: 0 !important;
  margin-top: 1em;
  display: inline-block;
  font-size: 0.82em;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  border: 0;
  border-radius: 500px;
  padding: 13px;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  letter-spacing: 2px;
  min-width: 130px;
  white-space: normal;
  will-change: transform;
  text-transform: uppercase;
  line-height: 1.3;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #2ebd59;
  padding: 13px 44px;
  font-family: sans-serif;

  &:hover {
    transform: scale(1.035);
    background-color: #1ed760;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CityPlaylistImpl = props => (
  <Page>
    <section class="mw-100 mw7-ns center tc pa3 ph5-ns">
      <h2 className="f3 lh-copy center tracked-tight lh-solid white-80 mb0">
        Bands from
      </h2>
      <h2 className="f2 lh-title center lh-solid white-90 mt0 mb0">
        San Francisco, California USA
      </h2>
      <p className="f6 lh-copy white-70">37.7749° N, 122.4194° W</p>
      <div className="db center mw12 black">
        <img
          className="br2 mw-100"
          alt="Frank Ocean Blonde Album Cover"
          src="https://farm5.staticflickr.com/4424/36354840063_18b0a4ca8f_b.jpg"
        />
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 fw9 white-90 tracked">74 Artists</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray tracked-mega">1977-2018</dd>
        </dl>
      </div>
      <SpotifyButton>Listen on Spotify</SpotifyButton>
    </section>
  </Page>
);
CityPlaylistImpl.getInitialProps = async props => {
  console.log(props);
  return {};
};

const getPlaylistQuery = gql`
  query getPlaylist($id: String!) {
    playlist(id: $id) {
      city
      state
      country
      playlistUri
    }
  }
`;

const withData = graphql(getPlaylistQuery, {
  options: ownProps => ({
    ...ownProps,
    variables: {
      id: '',
    },
  }),
});

export default CityPlaylistImpl;
