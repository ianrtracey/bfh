import * as React from 'react';
import Link from 'next/link';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10em;
`;
const Input = styled.input``;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'arizona',
    };
  }

  handleOnChange = e => {
    const query = e.target.value;
    this.props.data.refetch({ query });
  };

  render() {
    return (
      <SearchWrapper>
        <Input onChange={this.handleOnChange} />
        {this.renderResults()}
      </SearchWrapper>
    );
  }

  playPlaylist(playlistUri) {
    this.props.mutate({
      variables: {
        spotifyUri: playlistUri,
      }
    })
  }

  renderResults() {
    const { loading, error, playlists } = this.props.data;

    if (loading) return null;
    if (error) return `Error: ${error}`;

    console.log(this.props)

    return (
      <ul>
        {playlists.map(playlist => (
          <div>
            <a onClick={() => this.playPlaylist(playlist.playlistUri)}>
              {playlist.city} {playlist.state}
            </a>
          </div>
        ))}
      </ul>
    );
  }
}

const getPlaylistsQuery = gql`
  query GetPlaylists($query: String!) {
    playlists(query: $query) {
      id
      city
      state
      country
      playlistUri
    }
  }
`;

const playPlaylistMutation = gql`
mutation PlayPlaylist($spotifyUri: String!) {
  play(spotifyUri: $spotifyUri) {
    status
  }
}
`;
export default compose(
  graphql(playPlaylistMutation),
  graphql(getPlaylistsQuery, {
    options: {
      variables: {
        query: '',
      },
    }
  }),
)(Search);
